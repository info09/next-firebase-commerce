"use server";
import { addProduct, deleteProductById } from "learning/feature/products/model";
import { ICreateInputProduct } from "learning/feature/products/type";
import { revalidatePath } from "next/cache";

export const onAddProduct = async (data: ICreateInputProduct) => {
  await addProduct(data);
  console.log("🚀 ~ onAddProduct ~ data:", data);

  revalidatePath("/admin/products");
};
