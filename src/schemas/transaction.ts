import { z } from "zod";

export const ItemTransactionSchema = z.object({
    category: z.string(),
    keterangan: z.string(),
    unitPrice: z.union([z.string(), z.number()]),
});

// Schema utama untuk validasi input request
export const RequestTransactionSchema = z.object({
    nis: z.string(),
    name: z.string(),
    orderId: z.string(),
    amount: z.string().min(1),
    paymentMethod: z.string().min(1),
    item: z.array(ItemTransactionSchema),
    noRek: z.string(),
});
