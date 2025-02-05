"use server";
import { createAdmin } from "learning/feature/managers/model";
import { ICreateAdminInput } from "learning/feature/managers/type";
import { revalidatePath } from "next/cache";

export const onAddAdmin = async (data: ICreateAdminInput) => {
  await createAdmin(data);
  revalidatePath("/admin/managers");
};
