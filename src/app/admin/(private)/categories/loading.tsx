import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "learning/components/ui/card";
import TableHeader from "learning/components/common/table-header";
import TableLoading from "learning/components/common/table-loading";
import TablePagination from "learning/components/common/table-pagination";
const Category = async () => {
  return (
    <div>
      <TableHeader addTitle="Add Category" addPath="/admin/categories/new" />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your Categories .</CardDescription>
        </CardHeader>
        <CardContent>
          <TableLoading />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> categories
          </div>
          <TablePagination total={10} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Category;
