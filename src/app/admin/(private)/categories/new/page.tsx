"use client";
import { ICreateCategoryInput } from "learning/feature/categories/type";
import React from "react";
import { onAddCategory } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormCategory from "../category-form";

const page = () => {
  const router = useRouter();
  const onSubmit = async ({
    name,
    description,
    slug,
  }: ICreateCategoryInput) => {
    try {
      await onAddCategory({ name, description, slug });
      toast.info("Add category success!");
      router.push("/admin/categories");
    } catch (error) {
      console.log("🚀 ~ page ~ error:", error);
      toast.error("Cannot add category");
    }
  };
  return (
    <div>
      <h3 className="text-lg font-bold mb-8">Create category</h3>
      <FormCategory onSubmit={onSubmit} />
    </div>
  );
};

export default page;
