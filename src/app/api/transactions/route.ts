import { db } from "@/lib/db";
import { RequestTransactionSchema } from "@/schemas/transaction";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const splitName = (fullName: string) => {
    const nameParts = fullName.split(' ');
    if (nameParts.length === 1) {
        return {
            firstName: nameParts[0],
            lastName: nameParts[0], // sama dengan firstName
        };
    }

    // Jika ada lebih dari satu kata, ambil firstName dari yang pertama dan lastName dari yang terakhir
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    return { firstName, lastName };
};

export async function GET(request: NextRequest) {
    const data = await db.transaction.findMany({})
    return NextResponse.json({
        data
    });
}

export async function POST(request: NextRequest) {
    // Parsing dan validasi data dengan Zod
    const body = await request.json();

    const validated = RequestTransactionSchema.safeParse(body);
    if (!validated.success) {
        return NextResponse.json({
            error: validated.error
        });
    }

    const data = validated.data
    try {
        const res = await axios.post('https://devo.finnet.co.id/pg/payment/card/initiate', {
            customer: {
                id: data.nis,
                email: "azkal@gmail.com",
                firstName: splitName(data.name).firstName,
                lastName: splitName(data.name).lastName,
                mobilePhone: "+6281286288844"
            },
            order: {
                id: data.orderId,
                amount: (parseInt(data.amount) + 2500).toString(),
                itemAmount: data.amount,
                surchargeAmount: "2500",
                description: "Tf otomatis",
                item: data?.item.map((item: any) => ({
                    category: item.category,
                    description: item.keterangan,
                    name: item.category,
                    quantity: "1",
                    unitPrice: item.unitPrice,
                }))
            },
            url: {
                successUrl: process.env.CALLBACK,
                failUrl: process.env.CALLBACK,
                callbackUrl: process.env.CALLBACK
            },
            sourceOfFunds: {
                type: data.paymentMethod
            }
        }, {
            headers: {
                Authorization: "Basic U0VTQTE4OTp1SWtHbHI4T3ZEQ2hieHFIM1FObUJSWmpTWDFUYzRKTA=="
            }
        })
        if (res) {
            const result = await db.transaction.create({
                data: {
                    status: "PENDING",
                    name: data.name,
                    transactionDate: new Date(),
                    nis: data.nis,
                    noRek: data.noRek,
                    traceId: res.data.traceId,
                    orderId: data.orderId,
                    paymentMethod: data.paymentMethod,
                    totalAmount: parseInt(data.amount) + 2500,
                    paymentCode: res.data.paymentCode || null,
                    redirecturl: res.data.redirecturl || null,
                    stringQr: res.data.stringQr || null,
                    expiryLink: res.data.expiryLink || null,
                    details: {
                        createMany: {
                            data: data?.item.map((item: any) => ({
                                sandiId: item.category,
                                description: item.keterangan,
                                total: parseFloat(item.unitPrice),
                            }))
                        }
                    }
                }
            })


            return NextResponse.json({
                message: "success",
                data: result
            });
        }

    } catch (e) {
        console.log(e);

        return NextResponse.json({
            error: "kesalahan sistem"
        });
    }
}
