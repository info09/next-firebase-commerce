"use server";
import { addCategory } from "learning/feature/categories/model";
import { ICreateCategoryInput } from "learning/feature/categories/type";
import { revalidatePath } from "next/cache";

export const onAddCategory = async (data: ICreateCategoryInput) => {
  await addCategory(data);

  revalidatePath("/admin/categories");
};
