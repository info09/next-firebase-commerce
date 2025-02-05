import TableHeader from "learning/components/common/table-header";
import TableLoading from "learning/components/common/table-loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "learning/components/ui/card";
import { getProducts } from "learning/feature/products/model";
import { IGetDataInput } from "learning/feature/type";
import React, { Suspense } from "react";
import ProductTable from "./table";
import TablePagination from "learning/components/common/table-pagination";

interface IProps {
  searchParams: IGetDataInput;
}
const ProductPage = async ({ searchParams }: IProps) => {
  const res = await getProducts({
    keyword: searchParams.keyword || "",
    page: searchParams.page,
    orderField: searchParams.orderField || "name",
    orderType: searchParams.orderType || "desc",
  });
  return (
    <div>
      <TableHeader addTitle="Add Product" addPath="/admin/products/new" />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your products</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableLoading />} key={searchParams.keyword}>
            <ProductTable data={res.data} />
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

export default ProductPage;
