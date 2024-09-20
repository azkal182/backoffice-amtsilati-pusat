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
import Link from "next/link";
import React from "react";
import FormAmtsilatiStore from "./form-amtsilati-store";
import TableAmtsilatiStore from "./table";
import { getStore } from "@/actios/amtsilati-store";

const AmtsilatiStorePage = async () => {
  const books = await getStore();
  return (
    <ContentLayout title="Amtsilati Store">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Amtsilati Store</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageContainer>
        <FormAmtsilatiStore />
        <TableAmtsilatiStore items={books as any} />
      </PageContainer>
    </ContentLayout>
  );
};

export default AmtsilatiStorePage;
