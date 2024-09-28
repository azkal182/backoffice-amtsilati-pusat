export function toRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

export function getHijriYearRange() {
    // Mendapatkan tahun Hijriyah saat ini
    const currentYearHijri = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
        year: 'numeric'
    }).format(new Date());

    const currentYear = parseInt(currentYearHijri, 10);
    const yearRange = [];

    // Menambahkan 3 tahun ke belakang dan 3 tahun ke depan
    for (let i = currentYear - 2; i <= currentYear + 2; i++) {
        yearRange.push(i);
    }

    return yearRange;
}
