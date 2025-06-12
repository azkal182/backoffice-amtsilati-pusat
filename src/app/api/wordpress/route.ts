import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/actios/wordpress";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const perPageParams = request?.nextUrl?.searchParams.get("per_page");
  const perPage = perPageParams ? parseInt(perPageParams) : 10;

  const result = await getPosts(perPage);
  return NextResponse.json(result);
}
