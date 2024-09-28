"use client";
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
import { toRupiah } from "@/utils";

export type TPengurus = {
  id: number;
  nis: string;
  name: number;
  status: string;
};

const TablePengurus = ({ pengurus }: { pengurus: TPengurus[] }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent syahriyah.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>NIS</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead>Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pengurus.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="capitalize">{item.nis}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.status}</TableCell>
              {/* <TableCell>{toRupiah(item.priceDisc)}</TableCell> */}
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

export default TablePengurus;
