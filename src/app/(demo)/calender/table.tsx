"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Event } from "@prisma/client";
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {Check, X, Trash2, Pen} from "lucide-react";
import {Button} from "@/components/ui/button";



function TableEvent({ events }: { events: Event[] }) {
  return (
    <div className="pt-4">
      <Table>
        <TableCaption>A list of your recent events.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Tanggal Mulai</TableHead>
            <TableHead>Tanggal Akhir</TableHead>
            <TableHead>Tampilkan Tahun</TableHead>
            <TableHead>Tampilkan Umur</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="capitalize">{event.name}</TableCell>
              <TableCell>
                {format(event.startDate, "PPP", { locale: id })}
              </TableCell>
              <TableCell>
                {event.endDate
                  ? format(event.endDate, "PPP", { locale: id })
                  : "-"}
              </TableCell>
              <TableCell>
                <div className={`${
                    event.showYear? "bg-green-400" : "bg-red-400"
                } text-xs rounded w-9 text-center mx-auto`}>{event.showYear ? "true":"false"}</div>

              </TableCell> <TableCell>
                <div className={`${
                    event.calculateAge? "bg-green-400" : "bg-red-400"
                } text-xs rounded w-9 text-center mx-auto`}>{event.calculateAge ? "true":"false"}</div>

              </TableCell>
              <TableCell className={"flex items-center"}>
                <Button
                    className="h-7 w-7 p-1 ml-2 bg-yellow-500 hover:bg-yellow-400"
                >
                  <Pen size={12} />
                </Button>
                <Button
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
    </div>
  );
}

export default TableEvent;
