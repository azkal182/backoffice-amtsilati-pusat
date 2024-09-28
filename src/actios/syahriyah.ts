"use server"

import { db } from "@/lib/db";
import { CreateSyahriyahSchema } from "@/schemas/syahriyah";
import { monthHijri, parseHijriDate } from "@/utils/calculate-payment-group";
import moment from "moment-hijri";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const getSyahriyahs = async () => {
    const syahriyahs = await db.priceSyahriyah.findMany({
        orderBy: { priceAtMasehi: "asc" }
    });
    revalidatePath("/syahriyah");
    return syahriyahs;
};

const createSyahriyah = async (values: z.infer<typeof CreateSyahriyahSchema>) => {
    const validated = await CreateSyahriyahSchema.safeParseAsync(values)
    if (!validated.success) {
        return { error: "invalid fields" }
    }

    const { monthtHijri, yearHijri, priceDisc, priceFull } = validated.data
    const { month, year } = parseHijriDate(`${monthtHijri} ${yearHijri}`)
    const monthIndex = monthHijri.indexOf(month) + 1
    const hijriDate = moment(`${year}-${monthIndex}-1`, 'iYYYY-iMM-iDD');
    const masehi = hijriDate.toISOString();

    const result = await db.priceSyahriyah.create({
        data: {
            priceAtHijri: `${monthtHijri.toLocaleString()} ${year}`,
            priceAtMasehi: masehi,
            priceDisc,
            priceFull
        }
    })
    revalidatePath("/syahriyah");
    return { success: "success!", data: result }
}

export { getSyahriyahs, createSyahriyah }
