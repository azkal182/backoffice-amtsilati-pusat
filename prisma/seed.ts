import { PrismaClient } from '@prisma/client'
import Provinces from "./json/provinsi.json";
import Regencies from "./json/kabupaten.json";
import Districts from "./json/kecamatan.json";
import Villages from "./json/kelurahan.json";
const prisma = new PrismaClient()


async function main() {
    console.log("insert provice ...");
    for (const item of Provinces) {
        await prisma.province.create({
            data: {
                id: item.id,
                name: item.name,
                code: item.code
            }
        })
    }
    console.log('province done');

    console.log("insert regencies ...");

    for (const item of Regencies) {
        await prisma.regency.create({
            data: {
                id: item.id,
                name: item.name,
                code: item.code,
                fullCode: item.full_code,
                provinceId: item.provinsi_id
            }
        })
    }

    console.log('regencies done');

    console.log("insert districts ...");

    for (const item of Districts) {
        await prisma.district.create({
            data: {
                id: item.id,
                name: item.name,
                code: item.code,
                fullCode: item.full_code,
                regencyId: item.kabupaten_id
            }
        })
    }
    console.log('districts done');

    console.log("insert village ...");

    for (const item of Villages as any) {
        await prisma.village.create({
            data: {
                id: item.id,
                name: item.name,
                code: item.code,
                fullCode: item.full_code,
                postalCode: item.pos_code,
                districtId: item.kecamatan_id
            }
        })
    }
    console.log('village done');

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
