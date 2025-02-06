"use client";
import { ICreateInputProduct } from "learning/feature/products/type";
import React from "react";
import FormProduct from "../../form";
import { onUpdateProduct } from "../../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IProps {
  data: ICreateInputProduct;
  id: string;
  adminId: string;
}
const UpdateFormProduct = ({ data, id, adminId }: IProps) => {
  const router = useRouter();
  const onSubmit = async (values: ICreateInputProduct) => {
    try {
      await onUpdateProduct(id, values);
      toast.info("Update product success!");
      router.push("/admin/products");
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      toast.error("Cannot update product");
    }
  };
  return (
    <div>
      <h3 className="text-lg font-bold mb-8">Update Product</h3>
      <FormProduct onSubmit={onSubmit} data={data} adminId={adminId} />
    </div>
  );
};

export default UpdateFormProduct;
