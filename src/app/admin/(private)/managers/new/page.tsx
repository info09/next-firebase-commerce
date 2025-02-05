"use client";
import React from "react";
import FormManager from "../manager-form";
import { useRouter } from "next/navigation";
import { ICreateAdminInput } from "learning/feature/managers/type";
import { onAddAdmin } from "./action";
import { toast } from "sonner";

const CreateAdmin = () => {
  const router = useRouter();
  const onSubmit = async ({ email, password }: ICreateAdminInput) => {
    try {
      await onAddAdmin({ email, password, isActive: true });
      toast.info("Add admin success!");
      router.push("/admin/managers");
    } catch (error) {
      console.log("🚀 ~ page ~ error:", error);
      toast.error("Cannot add admin");
    }
  };
  return (
    <div>
      <h3 className="text-lg font-bold mb-8">Create Admin</h3>
      <FormManager onSubmit={onSubmit} />
    </div>
  );
};

export default CreateAdmin;
