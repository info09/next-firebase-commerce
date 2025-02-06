import { authOptions } from "learning/app/api/auth/[...nextauth]/route";
import { getProductById } from "learning/feature/products/model";
import { getServerSession } from "next-auth";
import React from "react";
import UpdateFormProduct from "./update-form";
interface IProps {
  params: {
    id: string;
    adminId: string;
  };
}
const UpdateProduct = async ({ params }: IProps) => {
  const detailData = await getProductById(params.id);
  const session = await getServerSession(authOptions);
  return (
    detailData && (
      <UpdateFormProduct
        data={{
          description: detailData.description,
          name: detailData.name,
          slug: detailData.slug,
          properties: detailData.properties,
          defaultPrice: detailData.defaultPrice,
          images: detailData.images,
          createdId: detailData.created_by.id,
          categoryIds: detailData.categories.map((item) => item.id),
        }}
        id={params.id}
        adminId={session?.user?.id || ""}
      />
    )
  );
};

export default UpdateProduct;
