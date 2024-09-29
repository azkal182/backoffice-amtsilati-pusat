import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { province_id: string } }
) {
    const province_id = params.province_id;
    if (!province_id) {
        return NextResponse.json({ error: "params province_id required!" });
    }
    const regencies = await db.regency.findMany({
        where: {
            provinceId: parseInt(province_id)
        }
    });

    return NextResponse.json({ data: regencies });
}
