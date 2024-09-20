"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { createEvent, FormTypeEvent } from "@/actios/calender";
import { Category, FrequencyType } from "@prisma/client";

interface DatePickerDemoProps {
  isDateError?: string;
  selectedDate:
    | Date
    | {
        hijriYear: number;
        hijriMonth: number;
        hijriDay: number;
      }
    | null;
  setSelectedDate: any;
}

const DatePicker = ({
  isDateError,
  selectedDate,
  setSelectedDate
}: DatePickerDemoProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            isDateError && "border-red-500"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>Pilih tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          //   onSelect={setSelectedDate}
          onSelect={(data) => {
            setSelectedDate(data);
            console.log("oke", data);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

const EventForm = () => {
  const [formData, setFormData] = useState<FormTypeEvent>({
    name: "",
    startDate: null,
    isHijri: false,
    isCutiBersama: false,
    frequencyType: null,
    interval: 1,
    duration: 1,
    category: null,
    calculateAge: false
  });
  const [isDateError, setIsDateError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.startDate === null) {
      console.log("Tanggal awal wajib dipilih");

      setIsDateError("Tanggal awal wajib dipilih");
    }
    // Submit form logic here
    createEvent(formData);
    console.log(JSON.stringify(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
        <div className="form-group">
          <Label htmlFor="name">Nama Event</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Masukkan nama acara"
            className="mt-1"
            required
          />
        </div>

        <div className="form-group">
          <Label htmlFor="startDate">Tanggal Mulai</Label>
          <div className="mt-1">
            <DatePicker
              isDateError={isDateError}
              selectedDate={formData.startDate}
              setSelectedDate={(date: any) => {
                const formatedDate = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  12,
                  0,
                  0
                );

                setFormData({ ...formData, startDate: formatedDate as any });
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <Label htmlFor="frequencyId">Frekuensi</Label>
          <Select
            required
            onValueChange={(val: FrequencyType) =>
              setFormData({ ...formData, frequencyType: val })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Frekuensi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DAILY">Setiap Hari</SelectItem>
              <SelectItem value="WEEKLY">Setiap Minggu</SelectItem>
              <SelectItem value="MONTHLY">Setiap Bulan</SelectItem>
              <SelectItem value="YEARLY">Setiap Tahun</SelectItem>
              <SelectItem value="HIJRI_MONTHLY">
                Setiap Bulan Hijriyah
              </SelectItem>
              <SelectItem value="HIJRI_YEARLY">
                Setiap Tahun Hijriyah
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="form-group">
          <Label htmlFor="frequencyId">Kategori</Label>
          <Select
            required
            onValueChange={(val: Category) =>
              setFormData({ ...formData, category: val })
            }
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Pilih Kategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HARI_LIBUR_NASIONAL">
                Hari Libur Nasional
              </SelectItem>
              <SelectItem value="HARI_BESAR_ISLAM">Hari Besar Islam</SelectItem>
              <SelectItem value="HARI_BESAR_PPDF">Hari Besar PPDF</SelectItem>
              <SelectItem value="HARI_SUNNAH">Hari Sunnah</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-3">
        <div className="form-group flex items-center gap-2">
          <Checkbox
            id="isHijri"
            name="isHijri"
            checked={formData.isHijri}
            onCheckedChange={(val: boolean) => {
              setFormData({ ...formData, isHijri: val });
            }}
          />
          <Label htmlFor="isHijri">Menggunakan Kalender Hijriah?</Label>
        </div>

        <div className="form-group flex items-center gap-2">
          <Checkbox
            id="isCutiBersama"
            name="isCutiBersama"
            checked={formData.isCutiBersama}
            onCheckedChange={(val: boolean) =>
              setFormData({ ...formData, isCutiBersama: val })
            }
          />
          <Label htmlFor="isCutiBersama">Cuti Bersama?</Label>
        </div>
        <div className="form-group flex items-center gap-2">
          <Checkbox
            id="calculateAge"
            name="calculateAge"
            checked={formData.calculateAge}
            onCheckedChange={(val: boolean) =>
              setFormData({ ...formData, calculateAge: val })
            }
          />
          <Label htmlFor="isCutiBersama">Hitung Umur?</Label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* <div className="form-group">
          <Label htmlFor="duration">Durasi (hari)</Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="Masukkan durasi (opsional)"
            className="mt-1"
          />
        </div> */}
      </div>

      {/* <div className="form-group">
        <Label htmlFor="endDate">Tanggal Selesai</Label>
        <DatePicker
          selectedDate={formData.endDate}
          setSelectedDate={(date) =>
            setFormData({ ...formData, endDate: date })
          }
        />
      </div> */}

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default EventForm;
