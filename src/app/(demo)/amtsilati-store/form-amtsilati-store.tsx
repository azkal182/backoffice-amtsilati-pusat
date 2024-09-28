"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { ImageBookDropZone } from "@/components/image-book-dropzone";
import { useEdgeStore } from "@/providers/edge-store-provider";
import { createStore } from "@/actios/amtsilati-store";
import ModalFormAmtsilatiStore from "@/app/(demo)/amtsilati-store/moda-form-amtsilati-store";

export type StoreFormData = {
  id?: string;
  title: string;
  description: string;
  maximumPurchase: string;
  pageTotal: string;
  isbn?: string;
  width: string;
  height: string;
  price: string;
  cover: string;
};
const FormAmtsilatiStore = () => {
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<Number | null>(null);
  const [file, setFile] = useState<File>();
  const { register, handleSubmit, reset, getValues, watch } =
    useForm<StoreFormData>();
  const [formData, setFormData] = useState<StoreFormData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' or 'edit'
  const [selectedData, setSelectedData] = useState<StoreFormData | null>(null);

  const isDisabled = true;
  const allValues = watch();
  const nonRequiredInputs: (keyof StoreFormData)[] = ["isbn"];
  const isAnyInputEmpty = Object.entries(allValues).some(([key, value]) => {
    return (
      !nonRequiredInputs.includes(key as keyof StoreFormData) && value === ""
    );
  });
  // @ts-ignore
  const handleOpenModal = (mode, data = null) => {
    setMode(mode);
    setSelectedData(data);
    setModalOpen(true);
  };
  const onSubmit = async (data: StoreFormData) => {
    setLoading(true);
    setFormData(data);

    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const res = await edgestore.publicFiles.upload({
          file: compressedFile,
          onProgressChange: (progress) => {
            setProgress(progress);
          }
        });
        data.cover = res.url;
        await createStore(data);
        setFile(undefined);
        reset();
        setProgress(null);
        setModalOpen(false);
        setLoading(false);
      } catch (error) {
        console.log("error saat kompress image ", error);
      }
    }
  };
  return (
    <div className="">
      <Button
        onClick={() => handleOpenModal("create")}
        className="bg-blue-600 hover:bg-blue-500 text-white"
      >
        Add New Store
      </Button>
      <ModalFormAmtsilatiStore
        isOpen={modalOpen}
        onClose={setModalOpen}
        mode={mode}
        data={selectedData}
      />
    </div>
  );
};

export default FormAmtsilatiStore;
