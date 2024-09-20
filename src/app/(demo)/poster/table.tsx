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

export type TPosters = {
  id: number;
  description: string;
  url: string;
  path: string;
  created_at: Date;
  publish: boolean;
};

const TablePoster = ({ posters }: { posters: TPosters[] }) => {
  const [modalState, setModalState] = useState<{
    type: "edit" | "delete" | null;
    data: TPosters | null;
  }>({ type: null, data: null });

  const openModal = useCallback((type: "edit" | "delete", data: TPosters) => {
    setModalState({ type, data });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ type: null, data: null });
  }, []);

  const handleEdit = useCallback(
    async (id: number, publish: boolean) => {
      await updatePublish(id, publish);
      closeModal();
    },
    [closeModal]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      await deletePoster(id);
      closeModal();
    },
    [closeModal]
  );

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posters.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Url</TableHead>
            <TableHead>Publish</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posters.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={item.url}
                  height={150}
                  width={80}
                  alt="thumbnail"
                  loading="lazy"
                />
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="w-80">
                <div className="flex w-80 h-full">
                  <Link
                    href={item.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className=" overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {item.url}
                  </Link>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div
                  className={`${
                    item.publish ? "bg-green-400" : "bg-red-400"
                  } text-xs rounded w-9 text-center mx-auto`}
                >
                  {item.publish ? "true" : "false"}
                </div>
              </TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for editing */}
      {modalState.type === "edit" && (
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Apakah {modalState.data?.description} akan di{" "}
                {modalState.data?.publish ? "Arsipkan" : "publish"}?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  handleEdit(
                    modalState.data?.id as number,
                    !modalState.data?.publish
                  )
                }
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Modal for deletion */}
      {modalState.type === "delete" && (
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Apakah anda benar benar yakin?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus
                poster secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(modalState.data?.id as number)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default TablePoster;
