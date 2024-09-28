import { Button } from "@/components/ui/button";
import { createEventWithCutiBersama } from "@/lib/event";
import { FrequencyType } from "@prisma/client";
import React from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import PageContainer from "@/components/page-container";
import { getSyahriyahs } from "@/actios/syahriyah";
import { getPengurus } from "@/actios/pengurus";
import TablePengurus from "./table";
import FormPengurus from "./form-pengurus";

const PengurusPage = async () => {
  const pengurus = await getPengurus();
  console.log(JSON.stringify(pengurus, null, 2));

  return (
    <ContentLayout title="Pengurus">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pengurus</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageContainer>
        <div>
          <FormPengurus />
          <div className="mt-2">
            <TablePengurus pengurus={pengurus} />
          </div>
        </div>
      </PageContainer>
    </ContentLayout>
  );
};

export default PengurusPage;
