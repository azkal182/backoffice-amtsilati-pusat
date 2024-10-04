"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Trash2, X } from "lucide-react";
import axios from "axios";
import { testCreate } from "@/actios/test";

export const formatRibuan = (value: string): string => {
  const number = parseFloat(value);
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 2
  }).format(number);
};
const dummy = {
  nis: "1234",
  noRek: "1234",
  nama: "AZKAL",
  status: "PENDING",
  nominal: "100000",
  keterangan: "testing"
};
function TableComponent({ data }: { data: any }) {
  return (
    <div>
      {/*
      <Table>
        <TableCaption>A list of your recent posters.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>OrderId</TableHead>
            <TableHead>NIS</TableHead>
            <TableHead>No Rek</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Keterangan</TableHead>
            <TableHead>Nominal</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: any, index: any) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.orderId}</TableCell>
              <TableCell>{item.nis}</TableCell>
              <TableCell>{item.noRek}</TableCell>
              <TableCell>{item.nama}</TableCell>
              <TableCell>{item?.keterangan}</TableCell>
              <TableCell>{formatRibuan(item.nominal)}</TableCell>
              <TableCell>
                <div
                  className={`p-0.5 ${
                    item.status === "PENDING" ? "bg-red-300" : "bg-green-300"
                  } w-16 text-xs rounded items-center justify-center`}
                >
                  <p className={"text-center"}>{item.status}</p>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
*/}
      <div>
        <Button onClick={() => testCreate()}>test transaction</Button>
      </div>
    </div>
  );
}

export default TableComponent;
