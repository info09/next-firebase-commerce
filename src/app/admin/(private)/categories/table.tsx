import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "learning/components/ui/table";
import { ICategoryDb } from "learning/feature/categories/type";
import { Pencil, Trash } from "lucide-react";
import React from "react";

interface IProps {
  data: ICategoryDb[];
}
const CategoryTable = ({ data }: IProps) => {
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
            <TableCell>{JSON.stringify(category.created_at)}</TableCell>
            <TableCell>{JSON.stringify(category.updated_at)}</TableCell>
            <TableCell>
              <div className="flex gap-1 cursor-pointer">
                <Pencil />
                <Trash />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
