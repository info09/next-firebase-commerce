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
import TablePagination from "./table-pagination";
import TableHeader from "./table-header";
import { getCategories } from "learning/feature/categories/model";
import TableLoading from "./table-loading";
import { IGetCategoryInput } from "learning/feature/categories/type";

interface IProps {
  searchParams: IGetCategoryInput;
}
const Category = async ({ searchParams }: IProps) => {
  const res = await getCategories({
    keyword: searchParams.keyword,
    page: searchParams.page,
  });
  console.log("🚀 ~ Category ~ data:", res);
  return (
    <div>
      <TableHeader />
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
            Showing <strong>1-10</strong> of <strong>{res.meta.total}</strong>{" "}
            categories
          </div>
          <TablePagination total={res.meta.total} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Category;
