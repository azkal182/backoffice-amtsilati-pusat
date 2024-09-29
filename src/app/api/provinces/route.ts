import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const provinces = await db.province.findMany()

    return NextResponse.json({
        data: provinces
    });
}
