import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  endAt,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "learning/utils/firebase";
import { COLLECTION } from "learning/constants/common";
import { ICategoryDb, ICategoryDoc, ICreateCategoryInput } from "./type";
import { AddCategorySchema } from "./rule";
import { formatZodMessage } from "learning/utils/common/zod-message";
import { IGetDataInput, IPaginationRes } from "../type";
import { getLastVisibleDoc } from "learning/utils/common/queries";

const categoriesRef = collection(db, COLLECTION.CATEGORY);
export const getCategoryBySlug = async (slug: string) => {
  const existedCategory = await getDocs(
    query(categoriesRef, where("slug", "==", slug))
  );

  if (!existedCategory.docs[0]) {
    return undefined;
  }

  const category = existedCategory.docs[0].data() as ICategoryDoc;

  return {
    ...category,
    id: existedCategory.docs[0].id,
  };
};

export const addCategory = async (
  data: ICreateCategoryInput
): Promise<ICategoryDb> => {
  const test = AddCategorySchema.safeParse(data);
  if (!test.success) {
    const message = formatZodMessage(test.error);
    throw Error(message);
  }

  const existedCategory = await getCategoryBySlug(data.slug);
  if (existedCategory) {
    throw Error("Slug have been used!");
  }

  const newCategoryRef = await addDoc(categoriesRef, {
    ...data,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  });

  const newCategory = await getDoc(newCategoryRef);
  return { id: newCategory.id, ...(newCategory.data() as ICategoryDoc) };
};

export const getCategoryById = async (id: string) => {
  const existedCategory = await getDoc(doc(categoriesRef, id));
  if (!existedCategory) {
    return undefined;
  }
  const category = existedCategory.data() as ICategoryDoc;
  return {
    ...category,
    id: existedCategory.id,
  };
};

export const updateCategory = async (
  id: string,
  data: ICreateCategoryInput
): Promise<ICategoryDb> => {
  const test = AddCategorySchema.safeParse(data);

  if (!test.success) {
    const message = formatZodMessage(test.error);
    throw Error(message);
  }

  const oldCategory = await getDoc(doc(categoriesRef, id));

  if (oldCategory.data() && data.slug !== (oldCategory.data() as any)?.slug) {
    const existedCategory = await getCategoryBySlug(data.slug);
    if (existedCategory) {
      throw Error("Slug have been used!");
    }
  }

  await updateDoc(doc(categoriesRef, id), {
    ...data,
    updated_at: Timestamp.now(),
  });

  const newCategory = await getDoc(doc(categoriesRef, id));

  return { id: newCategory.id, ...(newCategory.data() as ICategoryDoc) };
};

export const getCategories = async (
  data: IGetDataInput
): Promise<IPaginationRes<ICategoryDb>> => {
  const { keyword, page, size, orderField, orderType } = data;
  const queries = [];
  queries.push(orderBy(orderField, orderType));
  const queriesKeyword = [];
  if (keyword) {
    const keywordQueries =
      orderType === "asc"
        ? [startAt(keyword), endAt(keyword + "\uf8ff")]
        : [startAt(keyword + "\uf8ff"), endAt(keyword)];
    if (orderField !== "name") {
      queriesKeyword.unshift(orderBy("name") as any);
    }

    queriesKeyword.push(
      ...[orderBy("name"), startAt(keyword), endAt(keyword + "\uf8ff")]
    );
    queries.push(...keywordQueries);
  }

  if (page > 1) {
    const lastDoc = await getLastVisibleDoc(
      query(categoriesRef, ...queries),
      page,
      Number(size || 5)
    );
    queries.push(startAfter(lastDoc));
  }

  const categoriesDocsRef = await getDocs(
    query(categoriesRef, ...queries, limit(size || 5))
  );

  const categories = categoriesDocsRef.docs.slice(0, 5).map((d) => ({
    ...(d.data() as ICategoryDoc),
    id: d.id,
  }));

  const total = await getCountFromServer(
    query(categoriesRef, ...queriesKeyword)
  );

  return { meta: { total: total.data().count }, data: categories };
};

export const deleteCategoryById = async (id: string) => {
  await deleteDoc(doc(categoriesRef, id));
};

export const getCategoryByIds = async (ids: string[]) => {
  const categories = await getDocs(
    query(categoriesRef, where(documentId(), "in", ids))
  );
  return categories.docs.map((d) => ({
    ...(d.data() as ICategoryDoc),
    id: d.id,
  }));
};
