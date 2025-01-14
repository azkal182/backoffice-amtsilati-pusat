import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/actios/wordpress";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const result = await getPosts();
  return NextResponse.json(result);
}
