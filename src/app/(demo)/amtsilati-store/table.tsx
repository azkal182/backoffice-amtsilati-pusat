import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import React from "react";
import { StoreFormData } from "./form-amtsilati-store";
import Image from "next/image";

const TableAmtsilatiStore = ({ items }: { items: StoreFormData[] }) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Cover</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Deskripsi</TableHead>
          <TableHead>Harga</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          // @ts-ignore
          <TableRow key={item.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="text-center items-center">
              <div className="w-14 h-20 bg-slate-200 rounded overflow-hidden">
                <Image
                  src={item.cover}
                  height={80}
                  width={56}
                  alt="cover"
                  loading="lazy"
                />
              </div>
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableAmtsilatiStore;
