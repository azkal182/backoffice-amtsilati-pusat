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

export default function TransactionsPage() {
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
        <TableComponent />
      </PageContainer>
    </ContentLayout>
  );
}
