"use server"

import { db } from "@/lib/db";
import axios from "axios";
import { revalidatePath } from "next/cache";

const splitName = (fullName: string) => {
    // Split nama berdasarkan spasi
    const nameParts = fullName.split(' ');
    // Jika hanya ada satu kata, set lastName sama dengan firstName
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


export const testCreate = async (data: any) => {
    console.log(JSON.stringify(data, null, 2));


    // try {
    //     const res = await axios.post('https://devo.finnet.co.id/pg/payment/card/initiate', {
    //         customer: {
    //             id: data.nis,
    //             email: "azkal@gmail.com",
    //             firstName: splitName(data.name).firstName,
    //             lastName: splitName(data.name).lastName,
    //             mobilePhone: "+6281286288844"
    //         },
    //         order: {
    //             id: data.orderId,
    //             amount: (parseInt(data.amount) + 2500).toString(),
    //             itemAmount: data.amount,
    //             surchargeAmount: "2500",
    //             description: "Tf VA",
    //             item: data?.item.map((item: any) => ({
    //                 "category": item.category,
    //                 "description": item.keterangan,
    //                 "name": item.category,
    //                 "quantity": "1",
    //                 "unitPrice": item.unitPrice,
    //             }))
    //         },
    //         url: {
    //             successUrl: process.env.CALLBACK,
    //             failUrl: process.env.CALLBACK,
    //             callbackUrl: process.env.CALLBACK
    //         },
    //         sourceOfFunds: {
    //             type: data.paymentMethod
    //         }
    //     }, {
    //         headers: {
    //             Authorization: "Basic U0VTQTE4OTp1SWtHbHI4T3ZEQ2hieHFIM1FObUJSWmpTWDFUYzRKTA=="
    //         }
    //     })
    //     if (res) {
    //         // console.log(res.data)
    //         await db.transaction.create({
    //             data: {
    //                 status: "PENDING",
    //                 name: data.name,
    //                 transactionDate: new Date(),
    //                 nis: data.nis,
    //                 noRek: data.noRek,
    //                 traceId: res.data.traceId,
    //                 orderId: data.orderId,
    //                 paymentCode: res.data.paymentCode,
    //                 paymentMethod: data.paymentMethod,
    //                 totalAmount: parseInt(data.amount) + 2500,
    //                 details: {
    //                     createMany: {
    //                         data: data?.item.map((item: any) => ({
    //                             sandiId: item.category,
    //                             description: item.keterangan,
    //                             total: parseFloat(item.unitPrice),
    //                         }))
    //                     }
    //                 }
    //             }
    //         })

    //         revalidatePath("/transactions")

    //         return { data: res.data }
    //     }



    // } catch (e) {
    //     console.log(e)
    // }
}
