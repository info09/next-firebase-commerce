import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "learning/components/ui/table";
import { Pencil } from "lucide-react";
import React from "react";
import moment from "moment";
import Link from "next/link";
import { deleteCategoryById } from "learning/feature/categories/model";
import { revalidatePath } from "next/cache";
import { IAdminDb } from "learning/feature/managers/type";
import TableDeleteAction from "./table-delete-action";

interface IProps {
  data: IAdminDb[];
}
const ManagerTable = ({ data }: IProps) => {
  const onDelete = async (id: string) => {
    "use server";
    await deleteCategoryById(id);
    revalidatePath("/admin/categories");
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="w-28">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((admin) => (
          <TableRow key={admin.id}>
            <TableCell className="font-medium">{admin.email}</TableCell>
            <TableCell>
              {moment.unix(admin.created_at.seconds).calendar()}
            </TableCell>
            <TableCell>
              {moment.unix(admin.updated_at.seconds).calendar()}
            </TableCell>
            <TableCell>
              <div className="flex gap-1 cursor-pointer">
                <Link href={"/admin/categories/update/" + admin.id}>
                  <Pencil className="w-5 h-5" />
                </Link>
                <TableDeleteAction
                  id={admin.id}
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

export default ManagerTable;
