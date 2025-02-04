"use client";
import React from "react";
import FormCategory from "../../category-form";
import { ICreateCategoryInput } from "learning/feature/categories/type";
import { onUpdateCategory } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IProps {
  data?: ICreateCategoryInput;
  id: string;
}
const UpdateFormCategory = ({ data, id }: IProps) => {
  const router = useRouter();
  const onSubmit = async ({
    name,
    description,
    slug,
  }: ICreateCategoryInput) => {
    try {
      await onUpdateCategory(id, { name, description, slug });
      toast.info("Update category success!");
      router.push("/admin/categories");
    } catch (error) {
      console.log("🚀 ~ page ~ error:", error);
      toast.error("Cannot update category");
    }
  };
  return (
    <div>
      <h3 className="text-lg font-bold mb-8">Update Category</h3>
      <FormCategory onSubmit={onSubmit} data={data} />
    </div>
  );
};

export default UpdateFormCategory;
