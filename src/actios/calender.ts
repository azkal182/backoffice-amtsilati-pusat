"use server";

import { db } from "@/lib/db";
import { createEventWithCutiBersama } from "@/lib/event";
import { Category, FrequencyType } from "@prisma/client";
import moment from "moment-hijri";
import { revalidatePath } from "next/cache";

export type FormTypeEvent = {
    name: string;
    startDate:
    | Date
    | {
        hijriYear: number;
        hijriMonth: number;
        hijriDay: number;
    }
     | undefined;
    isHijri: boolean;
    isCutiBersama: boolean;
    frequencyType: FrequencyType | null | undefined;
    showYear?: boolean;
    interval: number;
    duration: number;
    category: Category | null | undefined;
    calculateAge: boolean;
};

const getEvents = async () => {
    const events = db.event.findMany()
    revalidatePath("calender")
    return events
}
const createEvent = async (formData: FormTypeEvent) => {
    try {
        // let gregorianStartDate: Date;

        // if (formData.isHijri && typeof formData.startDate === "object") {
        //     // @ts-ignore
        //     console.log(formData.startDate);

        //     const { hijriYear, hijriMonth, hijriDay } = startDate;
        //     const hijriDate = moment(
        //         `${hijriYear}-${hijriMonth}-${hijriDay}`,
        //         "iYYYY-iM-iD"
        //     );
        //     gregorianStartDate = hijriDate.toDate();
        // } else if (formData.startDate instanceof Date) {
        //     gregorianStartDate = formData.startDate;
        // } else {
        //     throw new Error("Invalid start date");
        // }

        // console.log({
        //   startDate: formData.startDate
        // });



        await db.event.create({
            data: {
                name: formData.name,
                startDate: formData.startDate as any,
                isHijri: ["HIJRI_MONTHLY", "HIJRI_YEARLY"].includes(formData.frequencyType as any),
                isCutiBersama: formData.isCutiBersama,
                frequency: formData.frequencyType as any,
                showYear: formData.showYear,
                category: formData.category as any,
                calculateAge: formData.calculateAge
            }
        });
        revalidatePath("calender")
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

export { getEvents, createEvent };
