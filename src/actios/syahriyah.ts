"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const getSyahriyahs = async () => {
    const syahriyahs = await db.priceSyahriyah.findMany({
        orderBy: { id: "desc" }
    });
    revalidatePath("/syahriyah");
    return syahriyahs;
};

export { getSyahriyahs }
