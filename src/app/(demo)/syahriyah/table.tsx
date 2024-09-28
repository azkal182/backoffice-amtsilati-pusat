"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Check, X, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { deletePoster, updatePublish } from "@/actios/poster";
import { toRupiah } from "@/utils";

export type TSyahriyah = {
  id: number;
  priceAtHijri: string;
  priceFull: number;
  priceDisc: number;
};

const TableSyahriyah = ({ syahriyahs }: { syahriyahs: TSyahriyah[] }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent syahriyah.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Periode</TableHead>
            <TableHead>Full</TableHead>
            <TableHead>Discount</TableHead>
            {/* <TableHead>Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {syahriyahs.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="capitalize">{item.priceAtHijri}</TableCell>
              <TableCell>{toRupiah(item.priceFull)}</TableCell>
              <TableCell>{toRupiah(item.priceDisc)}</TableCell>
              {/* <TableCell>
                <Button
                  onClick={() => openModal("edit", item)}
                  className={`h-7 w-7 p-1 ml-2 ${
                    item.publish
                      ? "bg-yellow-500 hover:bg-yellow-400"
                      : "bg-green-500 hover:bg-green-400"
                  }`}
                >
                  {item.publish ? <X size={12} /> : <Check size={12} />}
                </Button>
                <Button
                  onClick={() => openModal("delete", item)}
                  variant="destructive"
                  className="h-7 w-7 p-1 ml-2"
                >
                  <Trash2 size={12} />
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSyahriyah;
