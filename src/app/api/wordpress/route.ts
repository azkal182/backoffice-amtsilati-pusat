import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/actios/wordpress";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const data = await db.article.findUnique({
    where: {
      wordpressId: 22417,
    },
  });
  if (data) {
    return NextResponse.json(data);
  }
  const result = await getPosts();
  return NextResponse.json(result);
}
