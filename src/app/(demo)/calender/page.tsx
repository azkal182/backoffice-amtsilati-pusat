import { Button } from "@/components/ui/button";
import { createEventWithCutiBersama } from "@/lib/event";
import { FrequencyType } from "@prisma/client";
import React from "react";
import EventForm from "./form-calender";
import { db } from "@/lib/db";
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

const CalenderPage = async () => {
  return (
    // <div>
    //   <Button>Generate</Button>
    //   <EventForm frequencies={frequencies} />
    // </div>
    <ContentLayout title="Poster">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Poster</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageContainer>
        {/* <h1>PosterPage</h1> */}
        <EventForm />
      </PageContainer>
    </ContentLayout>
  );
};

export default CalenderPage;
