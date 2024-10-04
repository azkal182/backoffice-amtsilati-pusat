import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
    const res = await request.json()
    console.log(res)
    // const createData = await db.transaction.update({
    //     where:{
    //         orderId: res.order.id
    //     },
    //     data:{
    //         status: res.result.payment.status,
    //     }
    // })


    return NextResponse.json({
        data: "createData"
    });
}
