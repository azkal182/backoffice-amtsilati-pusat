import { db } from "@/lib/db";
import { calculateNextDates, createEventWithCutiBersama } from "@/lib/event";
import { Event, FrequencyType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment-hijri";


import _ from "lodash";

function calculateAge(birthDate: Date, targetYear: number): number {
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  // Hitung umur berdasarkan tahun target
  let age = targetYear - birthYear;

  // Buat tanggal target untuk tahun yang dihitung
  const targetDate = new Date(targetYear, birthMonth, birthDay);

  // Jika targetDate lebih besar dari birthDate (berarti ulang tahun belum lewat di tahun target)
  if (
    targetDate >
    new Date(targetYear, new Date().getMonth(), new Date().getDate())
  ) {
    age--;
  }

  return age;
}

const getColorByCategory = (category: string): string => {
  switch (category) {
    case "HARI_LIBUR_NASIONAL":
      return "red"; // Warna untuk Hari Libur Nasional
    case "HARI_BESAR_ISLAM":
      return "green"; // Warna untuk Hari Besar Islam
    case "HARI_BESAR_PPDF":
      return "blue"; // Warna untuk Hari Besar PPDF
    case "HARI_SUNNAH":
      return "orange"; // Warna untuk Hari Sunnah
    default:
      return "gray"; // Default color jika kategori tidak diketahui
  }
};
const transformEvents = (events: any[]) => {
  return events.reduce((result, event: Event) => {
    const formattedDate = new Date(event.startDate).toISOString().split("T")[0]; // Mengambil bagian tanggal (YYYY-MM-DD)

    // Membuat key baru dari category
    const key = _.snakeCase(event.category);

    // Membuat objek event baru sesuai dengan format yang diinginkan
    const transformedEvent = {
      key,
      dotColor: getColorByCategory(event.category),
      title: event.name
    };

    // Memasukkan event ke dalam array di bawah tanggal yang sesuai
    if (!result[formattedDate]) {
      result[formattedDate] = [];
    }

    result[formattedDate].push(transformedEvent);

    return result;
  }, {});
};
const getYear = (date:Date, isHijri:boolean) => {
  if (isHijri) {
    const yearHijri = moment(new Date(date)).iYear();
    return yearHijri
  } else {
    return date.getFullYear()
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const YEAR = parseInt(
    url.searchParams.get("year") ?? String(new Date().getFullYear())
  );
  const events = await db.event.findMany({});

  const resultEvent: any = [];

  for (const event of events) {
    const { startDate, frequency, isHijri } = event;
    const eventDates = calculateNextDates(
      startDate,
      frequency,
      1, // Default interval 1 jika tidak ada
      isHijri,
      YEAR
    );

    // Filter hanya event yang terjadi di tahun 2030
    const eventsInYear = eventDates.filter(
      (date) => date.getFullYear() === YEAR
    );

    if (eventsInYear.length > 0) {
      eventsInYear.map((date) => {
        resultEvent.push({
          name: `${event.name} ${event.showYear ? getYear(date, event.isHijri):""}${event.calculateAge ? "yang ke "+calculateAge(event.startDate, YEAR):""}`,
          cuti: event.isCutiBersama,
          category: event.category,
          startDate: date
        });
      });
    }
  }



  const sorted = resultEvent.sort(
    //   @ts-ignore
    (a:any, b:any) => new Date(a.startDate)  - new Date(b.startDate)
  );

  const transformed = transformEvents(sorted);

  return NextResponse.json({
    message: "success",
    events: transformed
  });
}
