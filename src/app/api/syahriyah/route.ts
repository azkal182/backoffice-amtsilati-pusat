import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment-hijri";
import { calculatePaymentGroup, parseHijriDate } from "@/utils/calculate-payment-group";

const monthHijri = [
    "muharram",
    "shafar",
    "rabiul awal",
    "rabiul akhir",
    "jumadil awal",
    "jumadil akhir",
    "rajab",
    "syaban",
    "ramadhan",
    "syawwal",
    "dzul qadah",
    "dzul hijjah"
];
// Cache untuk menyimpan monthPrices dan timestamp kapan diambil
let cache: { monthPrices: any[] | null, timestamp: number } = {
    monthPrices: null,
    timestamp: 0
};

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 hari dalam milidetik

// Fungsi untuk mengambil atau memperbarui cache jika perlu
const getCachedMonthPrices = async () => {
    const now = Date.now();

    // Cek apakah cache valid (belum kadaluarsa)
    if (cache.monthPrices && (now - cache.timestamp < CACHE_DURATION)) {
        return cache.monthPrices;
    }

    // Jika cache kadaluarsa atau belum ada, ambil dari database dan perbarui cache
    const monthPrices = await db.priceSyahriyah.findMany({ orderBy: { priceAtMasehi: "asc" } });
    cache = {
        monthPrices,
        timestamp: now
    };

    return monthPrices;
};

const findPrice = async (monthIndex: number, year: number, priceType: "FULL" | "DISC" | "FREE"): Promise<number> => {
    // Ambil data harga dari cache atau database
    const monthPrices = await getCachedMonthPrices();

    let applicablePrice: any = null;

    for (let i = 0; i < monthPrices.length; i++) {
        const { month: currentMonth, year: currentYear } = parseHijriDate(monthPrices[i].priceAtHijri);
        const currentYearNum = currentYear;
        const currentMonthIndex = monthHijri.indexOf(currentMonth);

        if (
            year > currentYearNum ||
            (year === currentYearNum && monthIndex >= currentMonthIndex)
        ) {
            applicablePrice = monthPrices[i]; // Simpan harga yang berlaku
        } else {
            break; // Keluar jika sudah melewati bulan atau tahun input
        }
    }

    if (applicablePrice) {
        let priceValue;
        if (priceType === "FULL") {
            priceValue = applicablePrice.priceFull;
        } else if (priceType === "DISC") {
            priceValue = applicablePrice.priceDisc;
        } else {
            // Jika priceType bukan "FULL" atau "DISC", maka set harga ke 0
            priceValue = 0;
        }
        return priceValue;
    } else {
        return 0;
    }
};




// const findPrice = async (monthIndex: number, year: number, priceType: "FULL" | "DISC" | "FREE"): Promise<number> => {
//     const monthPrices = await db.priceSyahriyah.findMany({ orderBy: { priceAtMasehi: "asc" } })
//     let applicablePrice: any = null;

//     for (let i = 0; i < monthPrices.length; i++) {
//         const { month: currentMonth, year: currentYear } = parseHijriDate(monthPrices[i].priceAtHijri);
//         const currentYearNum = currentYear
//         const currentMonthIndex = monthHijri.indexOf(currentMonth);

//         if (
//             year > currentYearNum ||
//             (year === currentYearNum && monthIndex >= currentMonthIndex)
//         ) {
//             applicablePrice = monthPrices[i]; // Simpan harga yang berlaku
//         } else {
//             break; // Keluar jika sudah melewati bulan atau tahun input
//         }
//     }

//     if (applicablePrice) {
//         let priceValue;
//         if (priceType === "FULL") {
//             priceValue = applicablePrice.priceFull;
//         } else if (priceType === "DISC") {
//             priceValue = applicablePrice.priceDisc;
//         } else {
//             // Jika priceType bukan "FULL" atau "DISC", maka set harga ke 0
//             priceValue = 0;
//         }
//         return priceValue
//     } else {
//         // return `Harga untuk bulan ${monthHijri[monthIndex]} ${year} tidak tersedia.`;
//         return 0
//     }
// };

const calculateSyahriyah = async (
    monthIndex: number,
    year: string,
    priceType: 'FULL' | 'DISC' | 'FREE',
    endMonthIndex?: number,
    endYear?: string
) => {
    const currentHijriDate = moment().format('iYYYY-iM'); // Mengambil tahun dan bulan hijriyah saat ini
    // const [currentYear, currentMonth] = currentHijriDate.split('-').map(Number); // Pisahkan tahun dan bulan hijriyah saat ini
    let [currentYear, currentMonth] = currentHijriDate.split('-').map(Number); // Pisahkan tahun dan bulan hijriyah saat ini

    // Membuat tanggal Hijriyah saat ini menggunakan moment hijri
    const hijriDate = moment().iYear(currentYear).iMonth(currentMonth - 1); // Bulan di moment mulai dari 0, jadi dikurangi 1

    // Tambahkan 1 bulan
    const nextHijriDate = hijriDate.add(1, 'iMonth');

    // Update currentMonth dengan nilai bulan yang baru
    currentMonth = nextHijriDate.iMonth() + 1; // iMonth dimulai dari 0, jadi tambahkan 1 agar sesuai dengan format manusia

    // Jika endMonthIndex dan endYear tidak diberikan, gunakan waktu hijriyah saat ini
    const targetEndMonthIndex = endMonthIndex !== undefined ? endMonthIndex : currentMonth - 1;
    const targetEndYear = endYear !== undefined ? parseInt(endYear) : currentYear;

    let monthsDifference = (currentYear - parseInt(year)) * 12 + (currentMonth - (monthIndex)); // Menghitung selisih bulan
    if (monthsDifference < 0) monthsDifference = 0; // Pastikan selisih bulan tidak negatif

    let unpaidMonths: { month: string, price: number, priceType: any }[] = [];
    let startIndex = monthIndex; // Memulai dari bulan berikutnya setelah `monthIndex`
    let unpaidYear = parseInt(year);
    let total = 0;
    let count = 0
    let lastPrice: number = 0;

    // Loop melalui setiap bulan yang belum dibayar
    while (monthsDifference >= 0) {
        // Cek apakah mencapai batas akhir perhitungan
        if (
            unpaidYear > targetEndYear ||
            (unpaidYear === targetEndYear && startIndex - 1 >= targetEndMonthIndex)
        ) {
            break; // Hentikan perhitungan jika sudah mencapai batas akhir
        }

        if (startIndex === 12) { // Jika sudah mencapai bulan terakhir (Dzul Hijjah), pindah ke tahun berikutnya
            startIndex = 0;
            unpaidYear++;
        }

        const monthName = `${monthHijri[startIndex]} ${unpaidYear}`;
        lastPrice = await findPrice(startIndex, unpaidYear, priceType)



        unpaidMonths.push({ month: monthName, price: lastPrice, priceType }); // Gunakan lastPrice
        total += lastPrice;
        if (priceType !== "FREE") {
            count += 1
        }

        startIndex++;
        monthsDifference--;
    }


    return {
        unpaidMonths,
        count,
        total
    };
};


const addOneMonth = (bulanIndex: number, tahun: any) => {
    if (bulanIndex === 11) {
        // Jika bulan saat ini adalah Muharram, pindah ke Dzulhijjah tahun sebelumnya
        return { bulan: 1, tahun: parseInt(tahun) + 1 };
    } else {
        // Kurangi 1 bulan
        return { bulan: bulanIndex + 1, tahun };
    }
};


export async function GET(request: NextRequest) {
    const url = new URL(request.url);

    const month = url.searchParams.get("month");
    const period = url.searchParams.get("period");
    const nis = url.searchParams.get("nis");
    if (!month || !period || !nis) {
        return NextResponse.json({
            error: "params date required",
        });
    }

    const monthIndex = monthHijri.indexOf(month.toLowerCase());
    const year = period.split(' ')[0]

    const pengurus = await db.pengurus.findUnique({ where: { nis: nis } });

    let combinedData = {
        unpaidMonths: [],
        count: 0,
        total: 0
    };

    if (pengurus) {
        const historyPengurus = await db.pengurusStatusHistory.findMany({ where: { pengurusId: pengurus.id }, orderBy: { id: "asc" } });
        // plus 1 month from last payment
        const currentDate = addOneMonth(monthHijri.indexOf(month), year)

        const testData = calculatePaymentGroup(monthHijri[currentDate.bulan] + currentDate.tahun, historyPengurus as any);
        let hasilTagihan: any = []
        // console.log(historyPengurus)
        // console.log(testData);
        for (const item of testData) {
            if (item.endAt) {
                const startMonthIndex = item.startAt ? monthHijri.indexOf(item.startAt.replace(/\d{4}$/, '').trim()) : undefined
                const startYear = item.startAt ? item.startAt.match(/\d+/)!![0] : undefined
                const endMonthIndex = item.endAt ? monthHijri.indexOf(item.endAt.replace(/\d{4}$/, '').trim()) : undefined
                const endYear = item.endAt ? item.endAt.match(/\d+/)!![0] : undefined
                // console.log({ startMonthIndex, startYear, endMonthIndex, endYear });
                const test = await calculateSyahriyah(startMonthIndex as any, startYear as any, item.type as any, endMonthIndex, endYear)
                //    @ts-ignore
                combinedData.unpaidMonths.push(...test.unpaidMonths)
                combinedData.total += test.total
                combinedData.count += test.count
            } else {
                const startMonthIndex = item.startAt ? monthHijri.indexOf(item.startAt.replace(/\d{4}$/, '').trim()) : undefined
                const startYear = item.startAt ? item.startAt.match(/\d+/)!![0] : undefined
                // console.log({ startMonthIndex, startYear, endMonthIndex, endYear });
                const test = await calculateSyahriyah(startMonthIndex as any, startYear as any, item.type as any)
                //    @ts-ignore
                combinedData.unpaidMonths.push(...test.unpaidMonths)
                combinedData.total += test.total
                combinedData.count += test.count

            }


            // const test = await calculateSyahriyah(monthIndex, year, item.type, item.endAt? item.endAt)
        }

        return NextResponse.json({
            month: monthIndex,
            year,
            data: combinedData
        });


    } else {
        let result = await calculateSyahriyah(monthIndex + 1, year, "FULL")
        return NextResponse.json({
            month: monthIndex,
            year,
            data: result
        });
    }



}
