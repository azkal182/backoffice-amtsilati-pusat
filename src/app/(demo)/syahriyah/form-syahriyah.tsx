"use client";
import { createSyahriyah } from "@/actios/syahriyah";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { CreateSyahriyahSchema } from "@/schemas/syahriyah";
import { getHijriYearRange } from "@/utils";
import { monthHijri } from "@/utils/calculate-payment-group";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSyahriyah = () => {
  const form = useForm<z.infer<typeof CreateSyahriyahSchema>>({
    resolver: zodResolver(CreateSyahriyahSchema)
  });

  function onSubmit(values: z.infer<typeof CreateSyahriyahSchema>) {
    createSyahriyah(values).then((data) => {
      if (data.success) {
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
          className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
        >
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
                <FormLabel>Bulan</FormLabel>
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
            name="priceFull"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full"
                    {...field}
                    type="number"
                    onChange={(value) =>
                      field.onChange(parseInt(value.target.value))
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceDisc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potongan</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Potongan"
                    {...field}
                    type="number"
                    onChange={(value) =>
                      field.onChange(parseInt(value.target.value))
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Simpan</Button>
        </form>
      </Form>
    </Card>
  );
};

export default FormSyahriyah;
