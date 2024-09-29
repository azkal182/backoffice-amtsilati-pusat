import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { regencie_id: string } }
) {
    const regencie_id = params.regencie_id;
    if (!regencie_id) {
        return NextResponse.json({ error: "params regencie_id required!" });
    }
    const districts = await db.district.findMany({
        where: {
            regencyId: parseInt(regencie_id)
        }
    });

    return NextResponse.json({ data: districts });
}
