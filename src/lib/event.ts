import { FrequencyType } from "@prisma/client";
import moment from "moment-hijri";
import { db } from "./db";

export async function createEventWithCutiBersama(
  name: string,
  startDate: Date | { hijriYear: number; hijriMonth: number; hijriDay: number },
  isHijri: boolean,
  isCutiBersama: boolean, // Apakah event ini termasuk cuti bersama
  frequencyType: FrequencyType,
  interval: number
) {
  let gregorianStartDate: Date;

  // Jika input berupa Hijriyah, konversi ke Gregorian menggunakan moment-hijri
  if (isHijri && typeof startDate === "object") {
    // @ts-ignore
    const { hijriYear, hijriMonth, hijriDay } = startDate;
    const hijriDate = moment(
      `${hijriYear}-${hijriMonth}-${hijriDay}`,
      "iYYYY-iM-iD"
    );
    gregorianStartDate = hijriDate.toDate();
  } else if (startDate instanceof Date) {
    gregorianStartDate = startDate;
  } else {
    throw new Error("Invalid start date");
  }

  // Buat event dengan flag cuti bersama
  const event = await db.event.create({
    data: {
      name: name,
      startDate: gregorianStartDate,
      isHijri: isHijri,
      isCutiBersama: isCutiBersama, // Tandai apakah ini cuti bersama
      frequency: {
        create: {
          type: frequencyType,
          interval: interval
        }
      }
    }
  });

  //   console.log("Event created with cuti bersama:", event);
}

// export function calculateNextDates(
//   startDate: Date,
//   frequencyType: FrequencyType,
//   interval: number,
//   isHijri: boolean,
//   targetYear: number
// ): Date[] {
//   const dates: Date[] = [];
//   let currentDate = new Date(startDate);

//   while (currentDate.getFullYear() <= targetYear) {
//     dates.push(new Date(currentDate));

//     if (isHijri) {
//       // Jika menggunakan kalender Hijriyah
//       const hijriDate = moment(currentDate);
//       switch (frequencyType) {
//         case "HIJRI_MONTHLY":
//           hijriDate.add(interval, "iMonth");
//           currentDate = hijriDate.toDate();
//           break;
//         case "HIJRI_YEARLY":
//           hijriDate.add(interval, "iYear");
//           currentDate = hijriDate.toDate();
//           break;
//         default:
//           throw new Error("Unsupported Hijri frequency type");
//       }
//     } else {
//       // Jika menggunakan kalender Masehi (Gregorian)
//       switch (frequencyType) {
//         case "DAILY":
//           currentDate.setDate(currentDate.getDate() + interval);
//           break;
//         case "WEEKLY":
//           currentDate.setDate(currentDate.getDate() + interval * 7);
//           break;
//         case "MONTHLY":
//           currentDate.setMonth(currentDate.getMonth() + interval);
//           break;
//         case "YEARLY":
//           currentDate.setFullYear(currentDate.getFullYear() + interval);
//           break;
//         default:
//           throw new Error("Unsupported Gregorian frequency type");
//       }
//     }
//   }

//   return dates;
// }

export function calculateNextDates(
  startDate: Date,
  frequencyType: string,
  interval: number,
  isHijri: boolean,
  targetYear: number
): Date[] {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  const incrementDate = (
    date: Date,
    frequencyType: string,
    interval: number,
    isHijri: boolean
  ) => {
    if (isHijri) {
      // Jika menggunakan kalender Hijriyah
      const hijriDate = moment(date);
      switch (frequencyType) {
        case "HIJRI_MONTHLY":
          hijriDate.add(interval, "iMonth");
          return hijriDate.toDate();
        case "HIJRI_YEARLY":
          hijriDate.add(interval, "iYear");
          return hijriDate.toDate();
        default:
          throw new Error("Unsupported Hijri frequency type");
      }
    } else {
      // Jika menggunakan kalender Masehi (Gregorian)
      const newDate = new Date(date);
      switch (frequencyType) {
        case "DAILY":
          newDate.setDate(newDate.getDate() + interval);
          break;
        case "WEEKLY":
          newDate.setDate(newDate.getDate() + interval * 7);
          break;
        case "MONTHLY":
          newDate.setMonth(newDate.getMonth() + interval);
          break;
        case "YEARLY":
          newDate.setFullYear(newDate.getFullYear() + interval);
          break;
        default:
          throw new Error("Unsupported Gregorian frequency type");
      }
      return newDate;
    }
  };

  if (startDate.getFullYear() <= targetYear) {
    // Loop jika tanggal dimulai sebelum atau pada targetYear
    while (currentDate.getFullYear() <= targetYear) {
      dates.push(new Date(currentDate));
      currentDate = incrementDate(
        currentDate,
        frequencyType,
        interval,
        isHijri
      );
    }
  } else {
    // Loop jika tanggal dimulai setelah targetYear (mundur)
    while (currentDate.getFullYear() >= targetYear) {
      dates.push(new Date(currentDate));
      currentDate = incrementDate(
        currentDate,
        frequencyType,
        -interval,
        isHijri
      );
    }
  }

  return dates;
}
