"use server";

import { StoreFormData } from "@/app/(demo)/amtsilati-store/form-amtsilati-store";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const getStore = async () => {
  const data = await db.store.findMany();
  return data;
};
const createStore = async (item: StoreFormData) => {
  const data = await db.store.create({
    data: {
      title: item.title,
      description: item.description,
      maximumPurchase: parseInt(item.maximumPurchase),
      pageTotal: parseInt(item.pageTotal),
      isbn: item.isbn,
      width: parseInt(item.width),
      height: parseInt(item.height),
      price: parseInt(item.price),
      cover: item.cover
    }
  });
  console.log(data);

  revalidatePath("/amtsilati-store");
  return;
};

export { createStore, getStore };
