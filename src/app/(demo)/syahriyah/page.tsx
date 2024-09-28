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
import TableSyahriyah from "./table";
import FormSyahriyah from "./form-syahriyah";

const SyahriyahPage = async () => {
  const syahriyahs = await getSyahriyahs();
  return (
    <ContentLayout title="Syahriyah">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Syahriyah</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageContainer>
        <FormSyahriyah />
        <div className="mt-4">
          <TableSyahriyah syahriyahs={syahriyahs} />
        </div>
      </PageContainer>
    </ContentLayout>
  );
};

export default SyahriyahPage;
