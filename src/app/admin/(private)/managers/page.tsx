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
import { getManagers } from "learning/feature/managers/model";
import React, { Suspense } from "react";
import ManagerTable from "./table";
import TablePagination from "learning/components/common/table-pagination";
import { IGetDataInput } from "learning/feature/type";
interface IProps {
  searchParams: IGetDataInput;
}
const ManagerPage = async ({ searchParams }: IProps) => {
  const res = await getManagers({
    keyword: searchParams.keyword || "",
    page: searchParams.page,
    orderField: searchParams.orderField || "email",
    orderType: searchParams.orderType || "desc",
  });
  console.log("🚀 ~ Manager ~ data:", res);
  return (
    <div>
      <TableHeader
        addTitle="Add Manager"
        addPath="/admin/managers/new"
        options={["email", "created_at", "updated_at"]}
      />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Managers</CardTitle>
          <CardDescription>
            Manage your Managers (Admin account) .
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableLoading />} key={searchParams.keyword}>
            <ManagerTable data={res.data} />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            <strong>{res.meta.total}</strong> managers
          </div>
          <TablePagination total={res.meta.total} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ManagerPage;
