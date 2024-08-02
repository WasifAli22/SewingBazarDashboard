import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = new NextResponse(null, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    response.cookies.delete("token");
    response.cookies.delete("logged-in");
    return response;
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}