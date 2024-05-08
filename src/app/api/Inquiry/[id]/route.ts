/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db/drizzle";
import { inquiry } from "@/lib/db/schema/inquiry";
import { NextResponse, NextRequest, } from "next/server";
import { eq } from 'drizzle-orm';

// DELETE function for deleting an existing inquiry
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Extract the ID from the request parameters
        const { id } = params;

        // Delete the inquiry from the database using drizzle-orm/pg
        const deletedInquiry = await db.delete(inquiry).where(eq(inquiry.user_id,Number(id))).execute();

        // Prepare the success response
        const responseBody = { status: "success", deleted: deletedInquiry };

        // Return the response
        return new NextResponse(JSON.stringify(responseBody), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Error in DELETE inquiry route:", error);
        // Handle errors and return an error response
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}