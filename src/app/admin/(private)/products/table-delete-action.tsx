"use client";
import { ConfirmDialog } from "learning/components/ui/alert-dialog";
import { toast } from "sonner";

interface IProps {
  id: string;
  deleteProductById: (id: string) => Promise<void>;
}
export const TableDeleteAction = async ({ id, deleteProductById }: IProps) => {
  const onDelete = async () => {
    try {
      await deleteProductById(id);
      toast.info("Delete product success!");
    } catch (error) {
      console.log("🚀 ~ page ~ error:", error);
      toast.error("Cannot delete product");
    }
  };

  return (
    <ConfirmDialog
      title="Delete this product"
      description="Do you want delete this product?"
      actionTitle="Delete"
      onConfirm={onDelete}
    />
  );
};
