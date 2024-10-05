import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
    const res = await request.json()
    console.log(res)
    const createData = await db.transaction.updateMany({
        where: {
            orderId: res.order.id
        },
        data: {
            status: res.result.payment.status,
            paidAt: res.result.datetime
        }
    })


    return NextResponse.json({
        data: "createData"
    });
}
