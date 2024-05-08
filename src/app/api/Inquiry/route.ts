/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db/drizzle";
import { inquiry } from "@/lib/db/schema/inquiry";
import { NextResponse, NextRequest, } from "next/server";
import { eq } from 'drizzle-orm';

export const GET = async () => {
    try {
        const res = await db.select().from(inquiry);
        return NextResponse.json(res);
    } catch (error) {
        console.log((error as { message: string }).message);
        return NextResponse.json({ msg: "Something went wrong" });
    }
};

// POST function for submitting a new inquiry
export async function POST(req: NextRequest) {
    try {
        // Check if req.body is null
        if (req.body === null) {
            throw new Error('Request body is empty');
        }

        // Since we have already checked for null, TypeScript now knows that req.body is of type ReadableStream<Uint8Array>
        const bodyStream = req.body;

        // Initialize an empty string to store the parsed body data
        let bodyString = '';

        // Create a reader for the ReadableStream
        const reader = bodyStream.getReader();

        // Read chunks of data until the stream ends
        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            // Convert each chunk to a string and append to the bodyString
            bodyString += new TextDecoder().decode(value);
        }

        // Parse the string as JSON
        const body = JSON.parse(bodyString);

        // Extract data from the parsed JSON body
        const { name, email, message, product_name, product_id } = body;

        // Insert the new inquiry into the database using drizzle-orm/pg
        const insertedInquiry = await db.insert(inquiry).values({
            name,
            email,
            product_name,
            product_id,
            inquiry_text: message,
            created_at: new Date(),
            updatedAt: new Date(),
        }).execute();

        // Prepare the success response
        const responseBody = { status: "success", inserted: insertedInquiry };

        // Return the response
        return new NextResponse(JSON.stringify(responseBody), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Error in POST inquiry route:", error);
        // Handle errors and return an error response
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// PUT function for updating an existing inquiry
export async function PUT(req: NextRequest) {
    try {
        // Check if req.body is null
        if (req.body === null) {
            throw new Error("Request body is empty");
        }

        // Since we have already checked for null, TypeScript now knows that req.body is of type ReadableStream<Uint8Array>
        const bodyStream = req.body;

        // Initialize an empty string to store the parsed body data
        let bodyString = "";

        // Create a reader for the ReadableStream
        const reader = bodyStream.getReader();

        // Read chunks of data until the stream ends
        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            // Convert each chunk to a string and append to the bodyString
            bodyString += new TextDecoder().decode(value);
        }

        // Parse the string as JSON
        const body = JSON.parse(bodyString);

        // Extract data from the parsed JSON body
        const { id, name, email, message, product_name, product_id } = body;

        // Update the existing inquiry in the database using drizzle-orm/pg
        const updatedInquiry = await db
            .update(inquiry)
            .set({
                name,
                user_id: id,
                email,
                product_name,
                product_id,
                inquiry_text: message,
                updatedAt: new Date(),
            })
            .where(eq(inquiry.user_id, id)) // Adjust based on your ORM syntax
            .execute();

        // Prepare the success response
        const responseBody = { status: "success", updated: updatedInquiry };

        // Return the response
        return new NextResponse(JSON.stringify(responseBody), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Error in PUT inquiry route:", error);
        // Handle errors and return an error response
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// DELETE function for deleting all inquiries
export async function DELETE() {
    try {
        // Delete all inquiries from the database using drizzle-orm/pg
        const deletedInquiries = await db.delete(inquiry).execute();

        // Prepare the success response
        const responseBody = { status: "success", deleted: deletedInquiries };

        // Return the response
        return new NextResponse(JSON.stringify(responseBody), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Error in DELETE all inquiries route:", error);
        // Handle errors and return an error response
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}