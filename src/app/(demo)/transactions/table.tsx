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
import { useRouter } from "next/navigation";
import useTransactionQuery from "@/feature/useTransactionQuery";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const formatRibuan = (value: string): string => {
  const number = parseFloat(value);
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 2
  }).format(number);
};
function TableComponent() {
  const router = useRouter();
  const { data: transactios, isLoading } = useTransactionQuery();
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>OrderId</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>NIS</TableHead>
            <TableHead>No Rek</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Paymentcode</TableHead>
            <TableHead>Pembayaran</TableHead>
            <TableHead>Nominal</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                loading...
              </TableCell>
            </TableRow>
          ) : (
            transactios?.data?.map((item: any, index: any) => (
              <TableRow
                onClick={() => router.push(`/transactions/${item.orderId}`)}
                className="cursor-pointer"
                key={item.id}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.orderId}</TableCell>
                <TableCell>
                  {format(
                    new Date(item.transactionDate),
                    "d MMMM yyyy, HH:mm:ss",
                    {
                      locale: id
                    }
                  )}
                </TableCell>
                <TableCell>{item.nis}</TableCell>
                <TableCell>{item.noRek}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item?.paymentCode}</TableCell>
                <TableCell>{item.paymentMethod}</TableCell>
                <TableCell>{formatRibuan(item.totalAmount)}</TableCell>
                <TableCell>
                  <div
                    className={`p-0.5 ${
                      item.status === "PENDING" ? "bg-red-400" : "bg-green-400"
                    } text-white w-16 text-xs rounded items-center justify-center`}
                  >
                    <p className={"text-center"}>{item.status}</p>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableComponent;
