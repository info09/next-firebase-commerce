import { addCategory } from "learning/feature/categories/model";
import { ICreateCategoryInput } from "learning/feature/categories/type";

export const onAddCategory = async (data: ICreateCategoryInput) => {
  await addCategory(data);
};
