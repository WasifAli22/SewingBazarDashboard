import { db } from "@/lib/db/drizzle";
import { inquiry } from "@/lib/db/schema/inquiry";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const res = await db.select().from(inquiry);
        return NextResponse.json(res);
    } catch (error) {
        console.log((error as { message: string }).message);
        return NextResponse.json({ msg: "Something went wrong" });
    }
};