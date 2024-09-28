import { number, object, string } from "zod"

export const CreateSyahriyahSchema = object({
    monthtHijri: string({ required_error: "Bulan is required" })
        .min(1, "Bulan is required"),
    yearHijri: string({ required_error: "Bulan is required" })
        .min(1, "Bulan is required"),
    priceAtMasehi: string().optional(),
    priceFull: number(),
    priceDisc: number()

})
