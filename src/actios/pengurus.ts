"use server"

import { db } from "@/lib/db";
import { CreatePengurusSchema } from "@/schemas/pengurus";
import { monthHijri, parseHijriDate } from "@/utils/calculate-payment-group";
import moment from "moment-hijri";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const getPengurus = async () => {
    const pengurus = await db.pengurus.findMany({
        include: {
            pengurusHistory: {
                take: 1,            // Hanya mengambil satu item
                orderBy: {
                    id: 'desc',       // Mengambil yang terbaru berdasarkan ID
                },
            },
        },
        orderBy: { id: 'desc' }
    });

    const formattedPengurus = pengurus.map(p => ({
        id: p.id,
        nis: p.nis,
        name: p.name,
        status: p.pengurusHistory.length > 0 ? p.pengurusHistory[0].categoryPrice : null // Ambil categoryPrice terakhir
    }));

    revalidatePath("/pengurus");
    return formattedPengurus;
};

const createPengurus = async (values: z.infer<typeof CreatePengurusSchema>) => {
    const validated = await CreatePengurusSchema.safeParseAsync(values)
    if (!validated.success) {
        return { error: "invalid fields" }
    }

    const { monthtHijri, yearHijri, nis, name, categoryPrice } = validated.data
    const { month, year } = parseHijriDate(`${monthtHijri} ${yearHijri}`)
    const monthIndex = monthHijri.indexOf(month) + 1
    const hijriDate = moment(`${year}-${monthIndex}-1`, 'iYYYY-iMM-iDD');
    const masehi = hijriDate.toISOString();

    const result = await db.pengurus.create({
        data: {
            nis,
            name,
            pengurusHistory: {
                create: {
                    startFormHijri: `${monthtHijri.toLocaleString()} ${year}`,
                    startMasehiAt: masehi,
                    categoryPrice,
                }
            }
        }
    })

    revalidatePath("/pengurus");
    return { success: "success!", data: result }



}



export { getPengurus, createPengurus }
