"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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

export { getPengurus }
