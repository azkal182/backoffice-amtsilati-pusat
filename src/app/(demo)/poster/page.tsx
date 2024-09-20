import { getPosters } from "@/actios/poster";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import PlaceholderContent from "@/components/demo/placeholder-content";
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
import FormPoster from "./form-poster";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Image from "next/image";
import { Pen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TablePoster, { TPosters } from "./table";

const PosterPage = async () => {
  const posters = await getPosters();
  console.log(posters);

  return (
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
        <FormPoster />
        <TablePoster posters={posters as TPosters[]} />
      </PageContainer>
    </ContentLayout>
  );
};

export default PosterPage;
