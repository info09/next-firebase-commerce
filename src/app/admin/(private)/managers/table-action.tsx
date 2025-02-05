"use client";
import React from "react";
import { ConfirmDialog } from "learning/components/ui/alert-dialog";
import { toast } from "sonner";
import { Switch } from "learning/components/ui/switch";

interface IProps {
  id: string;
  deleteCategoryById: (id: string) => void;
}
export const TableDeleteAction = ({ id, deleteCategoryById }: IProps) => {
  const onDelete = async () => {
    try {
      await deleteCategoryById(id);
      toast.success("Delete category successfully");
    } catch (error) {
      toast.error("Cannot delete category!");
    }
  };
  return (
    <ConfirmDialog
      title="Delete this category"
      description="Do you want to delete this category?"
      actionTitle="Delete"
      onConfirm={onDelete}
    />
  );
};

interface IActiveAdminActionProps {
  id: string;
  isActive: boolean;
  updateActiveAdmin: (id: string, isActive: boolean) => Promise<void>;
}
export const ActiveAdminAction = ({
  id,
  isActive,
  updateActiveAdmin,
}: IActiveAdminActionProps) => {
  const onChangeActive = async (check: boolean) => {
    try {
      await updateActiveAdmin(id, check);
      toast.success(
        check
          ? "Active manager successfully !"
          : "Inactive manager successfully !"
      );
    } catch (error) {
      toast.error("Cannot update active status!");
    }
  };
  return <Switch checked={isActive} onCheckedChange={onChangeActive} />;
};
