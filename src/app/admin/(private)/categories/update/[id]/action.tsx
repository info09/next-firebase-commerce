"use server";

import { updateCategory } from "learning/feature/categories/model";
import { ICreateCategoryInput } from "learning/feature/categories/type";

export const onUpdateCategory = async (
  id: string,
  data: ICreateCategoryInput
) => {
  await updateCategory(id, data);
};
