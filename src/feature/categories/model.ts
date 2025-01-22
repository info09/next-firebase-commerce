import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "learning/utils/firebase";
import { COLLECTION } from "learning/constants/common";
import { ICategoryDb, ICategoryDoc } from "./type";

const categoriesRef = collection(db, COLLECTION.CATEGORY);
export const getCategoryBySlug = async (slug: string) => {
  const existedCategory = await getDocs(
    query(categoriesRef, where("slug", "==", slug))
  );

  if (!existedCategory.docs[0]) {
    throw Error("Category is not exists");
  }

  const category = existedCategory.docs[0].data() as ICategoryDoc;

  return {
    ...category,
    id: existedCategory.docs[0].id,
  };
};

export const getCategories = async (): Promise<ICategoryDb[]> => {
  const categoriesDocsRef = await getDocs(query(categoriesRef));
  const categories = categoriesDocsRef.docs.map((d) => ({
    ...(d.data() as ICategoryDoc),
    id: d.id,
  }));
  return categories;
};
