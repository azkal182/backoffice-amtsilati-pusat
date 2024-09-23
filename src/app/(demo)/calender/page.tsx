import {Button} from "@/components/ui/button";
import {createEventWithCutiBersama} from "@/lib/event";
import {FrequencyType} from "@prisma/client";
import React from "react";
import EventForm from "./form-calender";
import {ContentLayout} from "@/components/admin-panel/content-layout";
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
import TableEvent from "./table";
import {getEvents} from "@/actios/calender";

const CalenderPage = async () => {
    const events = await getEvents();
    return (
        <ContentLayout title="Calender">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Calender</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageContainer>
                <EventForm/>
                <TableEvent events={events}/>
            </PageContainer>
        </ContentLayout>
    );
};

export default CalenderPage;
