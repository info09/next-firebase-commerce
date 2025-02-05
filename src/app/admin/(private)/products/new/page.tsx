"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ICreateInputProduct } from "learning/feature/products/type";
import { onAddProduct } from "../action";
import FormProduct from "../form";

const CreateProduct = () => {
  const router = useRouter();
  const onSubmit = async (data: ICreateInputProduct) => {
    try {
      await onAddProduct(data);
      toast.info("Add product success!");
      router.push("/admin/products");
    } catch (error) {
      console.log("🚀 ~ page ~ error:", error);
      toast.error("Cannot add product");
    }
  };
  return (
    <div>
      <h3 className="text-lg font-bold mb-8">Create product</h3>
      <FormProduct onSubmit={onSubmit} />
    </div>
  );
};

export default CreateProduct;
