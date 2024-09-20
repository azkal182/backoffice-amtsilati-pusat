"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const getPosters = async () => {
  const posters = await db.poster.findMany({
    orderBy: { created_at: "desc" }
  });

  revalidatePath("/poster");
  return posters;
};

const createPosters = async ({
  description,
  url,
  path
}: {
  description?: string;
  url: string;
  path?: string;
}) => {
  let data: any = {};

  if (description) {
    data.description = description;
  }
  if (url) {
    data.url = url;
  }
  if (path) {
    data.path = path;
  }

  const result = await db.poster.create({ data });
  revalidatePath("/poster");

  return;
};

const updatePublish = async (id: number, publish: boolean) => {
  const update = await db.poster.update({ where: { id }, data: { publish } });
  revalidatePath("/poster");
  return;
};

const deletePoster = async (id: number) => {
  const data = await db.poster.delete({ where: { id } });
  revalidatePath("/poster");
  return;
};

export { getPosters, createPosters, updatePublish, deletePoster };
