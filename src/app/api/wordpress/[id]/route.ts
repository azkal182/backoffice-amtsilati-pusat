import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getPosts } from "@/actios/wordpress";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const data = await db.article.findUnique({
    where: {
      wordpressId: parseInt(id),
    },
  });
  if (data) {
    return NextResponse.json(data);
  }
  const result = await getPosts(parseInt(id));
  return NextResponse.json(result);
}
