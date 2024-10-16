"use client";
import { createPengurus } from "@/actios/pengurus";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
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
import { CreatePengurusSchema } from "@/schemas/pengurus";
import { getHijriYearRange } from "@/utils";
import { monthHijri } from "@/utils/calculate-payment-group";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormPengurus = () => {
  const form = useForm<z.infer<typeof CreatePengurusSchema>>({
    resolver: zodResolver(CreatePengurusSchema)
  });

  function onSubmit(values: z.infer<typeof CreatePengurusSchema>) {
    createPengurus(values).then((data) => {
      if (data.success) {
        alert(data.data);
        form.reset();
      } else {
        alert("kesalahan sistem");
      }
    });
  }
  return (
    <Card className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid md:grid-cols-6 gap-2 items-end"
        >
          <FormField
            control={form.control}
            name="nis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIS</FormLabel>
                <FormControl>
                  <Input placeholder="NIS Pengurus" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Pengurus" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="monthtHijri"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bulan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue className="capitalize" placeholder="Bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthHijri.map((month) => (
                      <SelectItem
                        key={month}
                        value={month}
                        className="capitalize"
                      >
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearHijri"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="kategori syahriyah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULL">Full</SelectItem>
                    <SelectItem value="DISC">Potongan</SelectItem>
                    <SelectItem value="FREE">Gratis</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit">Simpan</Button>
        </form>
      </Form>
    </Card>
  );
};

export default FormPengurus;
