"use server";

import { db } from "@/lib/db";
import { createEventWithCutiBersama } from "@/lib/event";
import { Category, FrequencyType } from "@prisma/client";
import moment from "moment-hijri";

export type FormTypeEvent = {
  name: string;
  startDate:
    | Date
    | {
        hijriYear: number;
        hijriMonth: number;
        hijriDay: number;
      }
    | null;
  isHijri: boolean;
  isCutiBersama: boolean;
  frequencyType: FrequencyType | null;
  interval: number;
  duration: number;
  category: Category | null;
  calculateAge: boolean;
};
const createEvent = async (formData: FormTypeEvent) => {
  try {
    let gregorianStartDate: Date;

    if (formData.isHijri && typeof formData.startDate === "object") {
      // @ts-ignore
      const { hijriYear, hijriMonth, hijriDay } = startDate;
      const hijriDate = moment(
        `${hijriYear}-${hijriMonth}-${hijriDay}`,
        "iYYYY-iM-iD"
      );
      gregorianStartDate = hijriDate.toDate();
    } else if (formData.startDate instanceof Date) {
      gregorianStartDate = formData.startDate;
    } else {
      throw new Error("Invalid start date");
    }

    // console.log({
    //   startDate: formData.startDate
    // });

    const event = await db.event.create({
      data: {
        name: formData.name,
        startDate: gregorianStartDate,
        isHijri: formData.isHijri,
        isCutiBersama: formData.isCutiBersama,
        frequency: formData.frequencyType as any,
        category: formData.category as any,
        calculateAge: formData.calculateAge
      }
    });
    // console.log(event);
  } catch (error) {
    console.log(error);
  }

  //   createEventWithCutiBersama(
  //     formData.name,
  //     formData.startDate,
  //     formData.isHijri,
  //     formData.isCutiBersama,
  //     formData.frequencyType,
  //     formData.interval
  //   );
};

export { createEvent };
