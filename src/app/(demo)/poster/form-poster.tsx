"use client";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/providers/edge-store-provider";
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { Input } from "@/components/ui/input";
import { createPosters } from "@/actios/poster";
import { Button } from "@/components/ui/button";

function FormPoster() {
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<Number | null>(null);
  const [file, setFile] = useState<File>();
  const [description, setDescription] = useState("");

  const isDisabled = progress !== null || !(file && description !== "");

  async function handleCreatePoster(formData: FormData) {
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
        await createPosters({ url: res.url, description });
        setFile(undefined);
        setDescription("");
        setProgress(null);
      } catch (error) {
        console.log("error saat kompress image ", error);
      }
    }
  }
  return (
    <form action={handleCreatePoster}>
      <div className="md:w-[450px] mx-auto">
        <SingleImageDropzone
          className="mx-auto"
          width={450}
          height={180}
          value={file}
          onChange={(file) => {
            setFile(file);
          }}
        />
        <Input
          value={description}
          onChange={(val) => setDescription(val.target.value)}
          placeholder="Deskripsi"
          className="mt-2"
        />
        <Button disabled={isDisabled} type="submit" className="w-full mt-2">
          Submit
        </Button>
      </div>

      {progress !== null && (
        <div className="h-3 w-full border rounded overflow-hidden mt-2">
          <div
            className="h-full bg-slate-400 transition-none duration-150"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </form>
  );
}

export default FormPoster;
