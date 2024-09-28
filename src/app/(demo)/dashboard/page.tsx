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
import DatePickerDemo from "@/components/date-picker-demo";
import PageContainer from "@/components/page-container";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const [event, store, poster, pengurus] = await Promise.all([
    db.event.count(),
    db.store.count(),
    db.poster.count(),
    db.pengurus.count()
  ]);
  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* <PageContainer>
        <DatePickerDemo />
      </PageContainer> */}

      <div className="grid grid-cols-4 gap-4 mt-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <h3 className="tracking-tight text-sm font-medium">Total Event</h3>
            <Calendar className="h-4 w-4" />
          </div>
          <span className="text-2xl font-bold">{event}</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <h3 className="tracking-tight text-sm font-medium">Total Store</h3>
            <Calendar className="h-4 w-4" />
          </div>
          <span className="text-2xl font-bold">{store}</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <h3 className="tracking-tight text-sm font-medium">Total Poster</h3>
            <Calendar className="h-4 w-4" />
          </div>
          <span className="text-2xl font-bold">{poster}</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <h3 className="tracking-tight text-sm font-medium">
              Total Pengurus
            </h3>
            <Calendar className="h-4 w-4" />
          </div>
          <span className="text-2xl font-bold">{pengurus}</span>
        </Card>
      </div>
    </ContentLayout>
  );
}
