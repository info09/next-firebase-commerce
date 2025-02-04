import { getCategoryById } from "learning/feature/categories/model";
import React from "react";
import UpdateFormCategory from "./update-form";

interface IProps {
  params: {
    id: string;
  };
}
const UpdateCategory = async ({ params }: IProps) => {
  const detailData = await getCategoryById(params.id);

  return detailData && <UpdateFormCategory data={detailData} id={params.id} />;
};

export default UpdateCategory;
