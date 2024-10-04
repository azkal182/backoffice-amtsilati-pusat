import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const data = await db.transaction.findMany({})
    return NextResponse.json({
        data
    });
}

export async function POST(request: NextRequest) {
    const res = await request.json()
    // const createData = await db.transaction.create({
    //     data: {
    //         nis: res.nis,
    //         orderId: res.orderId,
    //         noRek: res.noRek,
    //         name: res.nama,
    //         status: res.status,
    //         totalAmount: res.nominal,
    //         keterangan: res.keterangan as string,
    //     }
    // })


    return NextResponse.json({
        data: "createData"
    });
}
