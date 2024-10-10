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
import React, { useState } from "react";
import { StoreFormData } from "./form-amtsilati-store";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pen, Trash2 } from "lucide-react";
import ModalFormAmtsilatiStore from "@/app/(demo)/amtsilati-store/moda-form-amtsilati-store";
import useStoreQuery from "@/feature/useStoreQuery";

const TableAmtsilatiStore = ({ items }: { items: StoreFormData[] }) => {
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("edit");
  const [selectedData, setSelectedData] = useState<StoreFormData>();

  const { data: stores, isLoading } = useStoreQuery();
  console.log(stores);

  const handleOpenModal = (mode: string, data: StoreFormData) => {
    setMode(mode);
    setSelectedData(data);
    setModal(true);
  };
  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Cover</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                loading...
              </TableCell>
            </TableRow>
          ) : (
            stores?.data?.map((item: any, index: number) => (
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
                <TableCell className={"flex items-center"}>
                  <Button
                    onClick={() => handleOpenModal("edit", item)}
                    className="h-7 w-7 p-1 ml-2 bg-yellow-500 hover:bg-yellow-400"
                  >
                    <Pen size={12} />
                  </Button>
                  <Button variant="destructive" className="h-7 w-7 p-1 ml-2">
                    <Trash2 size={12} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <ModalFormAmtsilatiStore
        isOpen={modal}
        onClose={setModal}
        mode={mode}
        data={selectedData as any}
      />
    </>
  );
};

export default TableAmtsilatiStore;
