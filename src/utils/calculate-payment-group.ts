export const monthHijri = [
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

interface PaymentEntry {
    id: number;
    pengurusId: number;
    categoryPrice: string;
    startFormHijri: string;
}

interface Result {
    startAt: string;
    endAt: string | undefined;
    type: string;
}

function isInRange(targetDate: string, startDate: string, endDate: string) {
    // Konversi bulan dan tahun menjadi angka tunggal untuk perbandingan
    const { month: targetMonth, year: targetYear } = parseHijriDate(targetDate);
    const { month: startMonth, year: startYear } = parseHijriDate(startDate);
    const { month: endMonth, year: endYear } = parseHijriDate(endDate);
    const target = targetYear * 12 + getMonthIndex(targetMonth);
    const start = startYear * 12 + getMonthIndex(startMonth);
    const end = endYear * 12 + getMonthIndex(endMonth);
    return target >= start && target <= end;
}

// Fungsi untuk mendapatkan indeks bulan dari nama bulan Hijriyah
function getMonthIndex(month: string): number {
    return monthHijri.indexOf(month.toLowerCase());
}

// Fungsi untuk memparsing format "bulan tahun" dengan mencocokkan nama bulan dari array monthHijri
export function parseHijriDate(hijriDate: string): { month: string, year: number } {
    // Cari bulan berdasarkan match dari daftar monthHijri
    const month = monthHijri.find(m => hijriDate.toLowerCase().startsWith(m.toLowerCase()));

    if (!month) {
        throw new Error("Bulan Hijriyah tidak valid");
    }

    // Setelah menemukan bulan, ambil tahun dari sisanya
    const year = parseInt(hijriDate.replace(month, "").trim(), 10);

    return { month, year };
}


// Fungsi untuk mengurangi satu bulan dalam kalender Hijriyah
function subtractOneMonth(month: string, year: number): { month: string, year: number } {
    let monthIndex = getMonthIndex(month);
    if (monthIndex === -1) throw new Error("Bulan tidak valid");

    monthIndex--; // Kurangi 1 bulan
    if (monthIndex < 0) {
        monthIndex = 11; // Kembali ke bulan "dzul hijjah"
        year--; // Kurangi tahun
    }

    return { month: monthHijri[monthIndex], year };
}

export function calculatePaymentGroup(lastPayment: string, payments: PaymentEntry[]): Result[] {
    const results: Result[] = [];
    let shouldCheckCondition = true;

    for (let i = 0; i < payments.length; i++) {

        const currentPayment = payments[i];
        const nextPayment = payments[i + 1];
        const lastPaymentDate = parseHijriDate(lastPayment);

        if (nextPayment) {
            const formDate = parseHijriDate(currentPayment.startFormHijri);
            const nextDate = parseHijriDate(nextPayment.startFormHijri);

            const from = formDate.year * 12 + getMonthIndex(formDate.month);
            const next = nextDate.year * 12 + getMonthIndex(nextDate.month);
            const target = lastPaymentDate.year * 12 + getMonthIndex(lastPaymentDate.month);

            const isRange = isInRange(lastPayment, currentPayment.startFormHijri, nextPayment.startFormHijri)
            if (target < next) {
                if (isRange) {
                    const startAt = `${lastPaymentDate.month} ${lastPaymentDate.year}`;
                    const { month: endAtMonth, year: endAtYear } = subtractOneMonth(nextDate.month, nextDate.year);
                    const endAt = `${endAtMonth} ${endAtYear}`;
                    results.push({
                        startAt: shouldCheckCondition ? startAt : currentPayment.startFormHijri,
                        endAt: endAt,
                        type: currentPayment.categoryPrice
                    });
                    shouldCheckCondition = false;
                    continue
                }
                const startAt = `${lastPaymentDate.month} ${lastPaymentDate.year}`;
                const { month: endAtMonth, year: endAtYear } = subtractOneMonth(nextDate.month, nextDate.year);
                const endAt = `${endAtMonth} ${endAtYear}`;
                results.push({
                    startAt: shouldCheckCondition ? startAt : currentPayment.startFormHijri,
                    endAt: endAt,
                    type: currentPayment.categoryPrice
                });
                shouldCheckCondition = false;
            }
        } else {
            const startAt = `${lastPaymentDate.month} ${lastPaymentDate.year}`;
            results.push({
                startAt: shouldCheckCondition ? startAt : currentPayment.startFormHijri,
                endAt: undefined,
                type: currentPayment.categoryPrice
            });
        }
    }
    return results;
}
