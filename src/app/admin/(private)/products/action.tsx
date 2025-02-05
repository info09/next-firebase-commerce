"use server";
import { ConfirmDialog } from "learning/components/ui/alert-dialog";
import { addProduct, deleteProductById } from "learning/feature/products/model";
import { ICreateInputProduct } from "learning/feature/products/type";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

export const onAddProduct = async (data: ICreateInputProduct) => {
  await addProduct(data);

  revalidatePath("/admin/products");
};
