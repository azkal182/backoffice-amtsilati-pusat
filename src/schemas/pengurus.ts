import { CatgoryPrice } from "@prisma/client"
import { boolean, nativeEnum, number, object, string } from "zod"

export const CreatePengurusSchema = object({
    nis: string({ required_error: "Nis is required" })
        .min(5, "Nis is required"),
    name: string({ required_error: "Name is required" })
        .min(4, "Name is required"),
    active: boolean().optional(),
    monthtHijri: string({ required_error: "Bulan is required" })
        .min(3, "Bulan is required"),
    yearHijri: string({ required_error: "Tahun is required" })
        .min(3, "Tahun is required"),
    categoryPrice: nativeEnum(CatgoryPrice)

})
