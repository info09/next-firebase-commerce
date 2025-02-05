import React, { Suspense } from "react";
import CategoryTable from "./table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "learning/components/ui/card";
import TablePagination from "../../../../components/common/table-pagination";
import TableHeader from "../../../../components/common/table-header";
import { getCategories } from "learning/feature/categories/model";
import TableLoading from "../../../../components/common/table-loading";
import { IGetDataInput } from "learning/feature/type";

interface IProps {
  searchParams: IGetDataInput;
}
const Category = async ({ searchParams }: IProps) => {
  const res = await getCategories({
    keyword: searchParams.keyword || "",
    page: searchParams.page,
    orderField: searchParams.orderField || "name",
    orderType: searchParams.orderType || "desc",
  });
  console.log("🚀 ~ Category ~ data:", res);
  return (
    <div>
      <TableHeader addTitle="Add Category" addPath="/admin/categories/new" />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your Categories .</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableLoading />} key={searchParams.keyword}>
            <CategoryTable data={res.data} />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            <strong>{res.meta.total}</strong> categories
          </div>
          <TablePagination total={res.meta.total} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Category;
