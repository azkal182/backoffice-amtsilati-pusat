import { ContentLayout } from "@/components/admin-panel/content-layout";
import PageContainer from "@/components/page-container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { db } from "@/lib/db";
import Link from "next/link";
import React from "react";

export const formatRibuan = (value: string): string => {
  const number = parseFloat(value);
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 2
  }).format(number);
};
const OrderPage = async ({ params }: { params: { orderId: string } }) => {
  const orderId = params.orderId;
  const data = await db.transaction.findUnique({
    where: {
      orderId: orderId
    },
    include: {
      details: true
    }
  });
  return (
    <ContentLayout title="Transaksi Detail">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Link href="/transactions">Transaksi</Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Transaksi Detail</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageContainer>
        <div className="flex items-center h-5">
          <div className="w-24 text-sm">NIS</div>
          <div className="text-sm">:</div>
          <div className="text-sm ml-1">{data?.nis}</div>
        </div>
        <div className="flex items-center h-5">
          <div className="w-24 text-sm">Nama</div>
          <div className="text-sm">: </div>
          <div className="text-sm m-1">{data?.name}</div>
        </div>
        <div className="flex items-center h-5">
          <div className="w-24 text-sm">No Rek</div>
          <div className="text-sm">:</div>
          <div className="text-sm ml-1">{data?.noRek}</div>
        </div>
        <div className="flex items-center h-5">
          <div className="w-24 text-sm">Status</div>
          <div className="text-sm">:</div>
          <div
            className={`text-xs px-1 rounded ml-1 text-white ${
              data?.status === "PENDING" ? "bg-red-400" : "bg-green-400"
            }`}
          >
            {data?.status}
          </div>
        </div>
        <div className="flex items-center h-5">
          <div className="w-24 text-sm">Kode VA</div>
          <div className="text-sm">:</div>
          <div className={`text-sm ml-1 `}>{data?.paymentCode}</div>
        </div>

        <Table>
          <TableCaption>A list of Transactions detail.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Kaetgori</TableHead>
              <TableHead>Keterangan</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.details?.map((item, index: any) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.sandiId}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">
                  Rp. {formatRibuan(item.total.toString())}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} style={{ fontWeight: "bold" }}>
                Total Keseluruhan:
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} className="text-right">
                Rp.{" "}
                {formatRibuan(
                  String(
                    data?.details?.reduce(
                      (acc: number, item: any) => acc + (item.total ?? 0),
                      0
                    )
                  )
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </PageContainer>
    </ContentLayout>
  );
};

export default OrderPage;
