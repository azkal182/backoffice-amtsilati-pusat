import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { getHijriYearRange } from "@/utils";
import { monthHijri } from "@/utils/calculate-payment-group";
import React from "react";

const FormPengurus = () => {
  return (
    <Card className="grid md:grid-cols-6 gap-2 items-end p-4">
      <div className="form-group">
        <Label htmlFor="name">NIS</Label>
        <Input
          id="nis"
          name="nis"
          placeholder="NIS Pengurus"
          className="mt-1"
          required
        />
      </div>
      <div className="form-group">
        <Label htmlFor="name">Nama</Label>
        <Input
          id="name"
          name="name"
          placeholder="Nama Pengurus"
          className="mt-1"
          required
        />
      </div>
      <div className="form-group">
        <Label htmlFor="name">Bulan Masuk / update</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue className="capitalize" placeholder="Bulan" />
          </SelectTrigger>
          <SelectContent>
            {monthHijri.map((month) => (
              <SelectItem key={month} value={month} className="capitalize">
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="form-group">
        <Label htmlFor="name">Tahun Masuk / update</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Tahun" />
          </SelectTrigger>
          <SelectContent>
            {getHijriYearRange().map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="form-group">
        <Label htmlFor="name">Syahriyah</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="kategori syahriyah" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FULL">Full</SelectItem>
            <SelectItem value="DISC">Potongan</SelectItem>
            <SelectItem value="FREE">Gratis</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button>Simpan</Button>
    </Card>
  );
};

export default FormPengurus;
