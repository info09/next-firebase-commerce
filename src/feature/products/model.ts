import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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
import { COLLECTION } from "learning/constants/common";
import { db } from "learning/utils/firebase";
import { ICreateInputProduct, IProductDb, IProductDoc } from "./type";
import { AddProductSchema } from "./rule";
import { formatZodMessage } from "learning/utils/common/zod-message";
import { getManagerById } from "../managers/model";
import { getCategoryById, getCategoryByIds } from "../categories/model";
import { IGetDataInput, IPaginationRes } from "../type";
import { getLastVisibleDoc } from "learning/utils/common/queries";

const productRef = collection(db, COLLECTION.PRODUCT);

export const getProductBySlug = async (slug: string) => {
  const existedProduct = await getDocs(
    query(productRef, where("slug", "==", slug))
  );

  if (!existedProduct.docs[0]) {
    return undefined;
  }

  const product = existedProduct.docs[0].data() as IProductDoc;

  return {
    ...product,
    id: existedProduct.docs[0].id,
  };
};

export const addProduct = async (
  data: ICreateInputProduct
): Promise<IProductDb> => {
  const test = AddProductSchema.safeParse(data);
  if (!test.success) {
    const message = formatZodMessage(test.error);
    throw Error(message);
  }

  const exitedProduct = await getProductBySlug(data.slug);
  if (exitedProduct) {
    throw Error("Slug have been used!");
  }
  const { createdId, categoryIds, ...restData } = data;
  const created_by = await getManagerById(createdId);
  const categories = await getCategoryByIds(categoryIds);
  const newProductRef = await addDoc(productRef, {
    ...restData,
    created_by,
    categories,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  });

  const newProduct = await getDoc(newProductRef);
  return { id: newProduct.id, ...(newProduct.data() as IProductDoc) };
};

export const updateProduct = async (
  id: string,
  data: ICreateInputProduct
): Promise<IProductDb> => {
  const test = AddProductSchema.safeParse(data);
  if (!test.success) {
    const message = formatZodMessage(test.error);
    throw Error(message);
  }

  const oldProduct = await getDoc(doc(productRef, id));
  if (oldProduct.data() && data.slug !== (oldProduct.data() as any)?.slug) {
    const existedProduct = await getProductBySlug(data.slug);
    if (existedProduct) {
      throw Error("Slug have been used!");
    }
  }

  await updateDoc(doc(productRef, id), {
    ...data,
    updated_at: Timestamp.now(),
  });

  const newProduct = await getDoc(doc(productRef, id));
  return { id, ...(newProduct.data() as IProductDoc) };
};

export const getProductById = async (id: string): Promise<IProductDb> => {
  const product = await getDoc(doc(productRef, id));
  return { id, ...(product.data() as IProductDoc) };
};

export const getProducts = async (
  data: IGetDataInput
): Promise<IPaginationRes<IProductDb>> => {
  const { keyword, page, size = 5, orderField, orderType } = data;
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
      query(productRef, ...queries),
      page,
      Number(size || 5)
    );
    queries.push(startAfter(lastDoc));
  }

  const productsDocsRef = await getDocs(
    query(productRef, ...queries, limit(size || 5))
  );

  const products = productsDocsRef.docs.slice(0, 5).map((d) => ({
    ...(d.data() as IProductDoc),
    id: d.id,
  }));
  const total = await getCountFromServer(query(productRef, ...queriesKeyword));
  return { meta: { total: total.data().count }, data: products };
};

export const deleteProductById = (id: string) => {
  return deleteDoc(doc(productRef, id));
};
