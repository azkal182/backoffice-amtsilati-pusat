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

export const formatRibuan = (value: string): string => {
  const number = parseFloat(value);
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 2
  }).format(number);
};
function TableComponent({ data }: { data: any }) {
  const router = useRouter();
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posters.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>OrderId</TableHead>
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
          {data.map((item: any, index: any) => (
            <TableRow
              onClick={() => router.push(`/transactions/${item.orderId}`)}
              className="cursor-pointer"
              key={item.id}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.orderId}</TableCell>
              <TableCell>{item.nis}</TableCell>
              <TableCell>{item.noRek}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.paymentCode}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableComponent;

const Bank = [
  {
    id: "alfamart",
    name: "Alfamart",
    category: "E-Wallet"
  },
  {
    id: "cc",
    name: "Credit / Debit Card",
    category: "Bank"
  },
  {
    id: "dana",
    name: "DANA",
    category: "E-Wallet"
  },
  {
    id: "finpaybpd",
    name: "Finpay BPD",
    category: "Bank"
  },
  {
    id: "finpaycode",
    name: "Finpay Payment Code",
    category: "Bank"
  },
  {
    id: "finpaymoney",
    name: "Finpay Money",
    category: "E-Wallet"
  },
  {
    id: "idm",
    name: "Indomaret",
    category: "E-Wallet"
  },
  {
    id: "indodana",
    name: "Indodana",
    category: "E-Wallet"
  },
  {
    id: "jeniuspay",
    name: "Jenius Pay",
    category: "E-Wallet"
  },
  {
    id: "kredivo",
    name: "Kredivo",
    category: "E-Wallet"
  },
  {
    id: "linkaja",
    name: "LinkAja Applink",
    category: "E-Wallet"
  },
  {
    id: "linkajawco",
    name: "LinkAja Web Checkout",
    category: "E-Wallet"
  },
  {
    id: "octoclicks",
    name: "OCTO Clicks",
    category: "E-Wallet"
  },
  {
    id: "ovo",
    name: "Ovo",
    category: "E-Wallet"
  },
  {
    id: "permatanet",
    name: "PermataNet",
    category: "Bank"
  },
  {
    id: "pospay",
    name: "Pospay",
    category: "Bank"
  },
  {
    id: "qris",
    name: "QRIS",
    category: "E-Wallet"
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    category: "E-Wallet"
  },
  {
    id: "vabca",
    name: "Virtual Account BCA",
    category: "Bank"
  },
  {
    id: "vabjb",
    name: "Virtual Account BJB",
    category: "Bank"
  },
  {
    id: "vabnc",
    name: "Virtual Account BNC",
    category: "Bank"
  },
  {
    id: "vabni",
    name: "Virtual Account BNI",
    category: "Bank"
  },
  {
    id: "vabri",
    name: "Virtual Account BRI",
    category: "Bank"
  },
  {
    id: "vabsi",
    name: "Virtual Account BSI",
    category: "Bank"
  },
  {
    id: "vabtn",
    name: "Virtual Account BTN",
    category: "Bank"
  },
  {
    id: "vamandiri",
    name: "Virtual Account Mandiri",
    category: "Bank"
  },
  {
    id: "vamaybank",
    name: "Virtual Account Maybank",
    category: "Bank"
  },
  {
    id: "vamega",
    name: "Virtual Account Mega",
    category: "Bank"
  },
  {
    id: "vanagari",
    name: "Virtual Account Nagari",
    category: "Bank"
  },
  {
    id: "vapermata",
    name: "Virtual Account Permata",
    category: "Bank"
  },
  {
    id: "virgo",
    name: "Virgo",
    category: "E-Wallet"
  }
];
