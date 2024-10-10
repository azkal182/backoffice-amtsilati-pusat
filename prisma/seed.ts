import { PrismaClient } from '@prisma/client'
import Provinces from "./json/provinsi.json";
import Regencies from "./json/kabupaten.json";
import Districts from "./json/kecamatan.json";
import Villages from "./json/kelurahan.json";
import PaymentMethods from "./json/payment-methods.json";
import Store from "./json/store.json"

const prisma = new PrismaClient()

type village = {
    id: number,
    name: string,
    code: string,
    full_code: string,
    pos_code: string,
    kecamatan_id: number
}

async function main() {

    for (const store of Store) {
        await prisma.store.upsert({
            where: { id: store.id },
            update: {
                title: store.title,
                description: store.description,
                firstPublished: new Date(store.firstPublished),
                maximumPurchase: store.maximumPurchase,
                pageTotal: store.pageTotal,
                isbn: store.isbn,
                width: store.width,
                height: store.height,
                price: store.price,
                cover: store.cover,
                created_at: store.created_at,
            },
            create: store,
        });
    }

    // for (const method of PaymentMethods) {
    //     await prisma.paymentMethod.upsert({
    //         where: { id: method.id },
    //         update: { name: method.name },
    //         create: { id: method.id, name: method.name, categoty: method.category.toLowerCase(), shortName: method.name.replace('Virtual Account', 'VA') }, // Buat baru jika belum ada
    //     });
    // }

    // await prisma.user.createMany({
    //     data: [
    //         {
    //             username: "admin",
    //             password: "$2y$10$KudiGr4hKhYDtpiTAY5cKOd5.DIF1uPf9U13RMTidDVKuGvrGfbfS"
    //         },
    //         {
    //             username: "ropik",
    //             password: "$2y$10$l1VWHKSwmDJW01o6x1u.le0.YgPYoK6WDBVqbmJ8GWKzUqFijmPgG"
    //         }
    //     ]
    // })
    // console.log("insert provice ...");

    // const formattedProvinces = (Provinces).map((item) => ({
    //     id: item.id,
    //     name: item.name,
    //     code: item.code,
    // }));
    // await prisma.province.createMany({
    //     data: formattedProvinces
    // })
    // console.log('province done');

    // console.log("insert regencies ...");
    // const formattedRegencies = (Regencies).map((item) => ({
    //     id: item.id,
    //     name: item.name,
    //     code: item.code,
    //     label: `${item.type === "Kota" ? "Kota." : "Kab."} ${item.name}`,
    //     type: item.type,
    //     fullCode: item.full_code,
    //     provinceId: item.provinsi_id
    // }));

    // await prisma.regency.createMany({
    //     data: formattedRegencies
    // })

    // console.log('regencies done');

    // console.log("insert districts ...");

    // const formattedDistricts = (Districts).map((item) => ({
    //     id: item.id,
    //     name: item.name,
    //     code: item.code,
    //     fullCode: item.full_code,
    //     regencyId: item.kabupaten_id
    // }));

    // await prisma.district.createMany({
    //     data: formattedDistricts
    // })
    // console.log('districts done');

    // const formattedVillages = (Villages as village[]).map((item, index) => ({
    //     id: item.id,
    //     name: item.name,
    //     code: item.code,
    //     fullCode: item.full_code,
    //     postalCode: item.pos_code,
    //     districtId: item.kecamatan_id,
    // }));

    // await prisma.village.createMany({
    //     data: formattedVillages,
    //     skipDuplicates: true
    // })



}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
