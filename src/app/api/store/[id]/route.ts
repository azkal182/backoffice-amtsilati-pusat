import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id; // 'a', 'b', or 'c'
    if (!id) {
        return NextResponse.json({ error: "field id required!" });
    }
    const data = await db.store.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    return NextResponse.json({ id, data });
}
