import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import PageContainer from "@/components/page-container";
import TableComponent from "@/app/(demo)/transactions/table";
import { db } from "@/lib/db";
import SampleData from "./sample";

export default async function TransactionsPage() {
  const data = await db.transaction.findMany();
  const paymentMethod = await db.paymentMethod.findMany();

  return (
    <ContentLayout title="Transaksi">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Transaksi</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageContainer>
        {/* <SampleData paymentMethod={paymentMethod} /> */}
        <TableComponent data={data} />
      </PageContainer>
    </ContentLayout>
  );
}
