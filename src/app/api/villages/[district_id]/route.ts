import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { district_id: string } }
) {
    const district_id = params.district_id;
    if (!district_id) {
        return NextResponse.json({ error: "params district_id required!" });
    }
    const villages = await db.village.findMany({
        where: {
            districtId: parseInt(district_id)
        }
    });

    return NextResponse.json({ data: villages });
}
