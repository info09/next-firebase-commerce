import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "learning/components/ui/table";
import { ICategoryDb } from "learning/feature/categories/type";
import { Pencil } from "lucide-react";
import React from "react";
import moment from "moment";
import Link from "next/link";
import TableDeleteAction from "./table-delete-action";
import { deleteCategoryById } from "learning/feature/categories/model";
import { revalidatePath } from "next/cache";

interface IProps {
  data: ICategoryDb[];
}
const CategoryTable = ({ data }: IProps) => {
  const onDelete = async (id: string) => {
    "use server";
    await deleteCategoryById(id);
    revalidatePath("/admin/categories");
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="w-28"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>{category.slug}</TableCell>
            <TableCell>
              {moment.unix(category.created_at.seconds).calendar()}
            </TableCell>
            <TableCell>
              {moment.unix(category.updated_at.seconds).calendar()}
            </TableCell>
            <TableCell>
              <div className="flex gap-1 cursor-pointer">
                <Link href={"/admin/categories/update/" + category.id}>
                  <Pencil className="w-5 h-5" />
                </Link>
                <TableDeleteAction
                  id={category.id}
                  deleteCategoryById={onDelete}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
