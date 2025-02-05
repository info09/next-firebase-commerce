import { db } from "learning/utils/firebase";
import {
  addDoc,
  collection,
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
import { IAdminDb, IAdminDoc, ICreateAdminInput } from "./type";
import { COLLECTION } from "learning/constants/common";
import { hashPassword } from "learning/utils/common/password";
import { IGetDataInput, IPaginationRes } from "../type";
import { getLastVisibleDoc } from "learning/utils/common/queries";
const adminRef = collection(db, COLLECTION.ADMIN);

export const findAdminByEmail = async (
  email: string
): Promise<IAdminDb | undefined> => {
  const existedAdmin = await getDocs(
    query(adminRef, where("email", "==", email))
  );

  if (!existedAdmin.docs[0]) {
    return undefined;
  }
  const admin = existedAdmin.docs[0].data() as IAdminDb;

  return {
    ...admin,
    id: existedAdmin.docs[0].id,
  };
};

export const createAdmin = async (data: ICreateAdminInput) => {
  const exitedAdmin = await findAdminByEmail(data.email);

  if (exitedAdmin) {
    throw Error("Email is exited");
  }

  const hash = await hashPassword(data.password);

  const newAdminRef = await addDoc(adminRef, {
    email: data.email,
    password: hash,
    isActive: data.isActive,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  });

  const newAdmin = await getDoc(newAdminRef);
  return { id: newAdmin.id, ...newAdmin.data() };
};

export const getManagers = async (
  data: IGetDataInput
): Promise<IPaginationRes<IAdminDb>> => {
  const { keyword, page, size = 5, orderField, orderType } = data;
  const queries = [];
  queries.push(orderBy(orderField, orderType));
  const queriesKeyword = [];
  if (keyword) {
    const keywordQueries =
      orderType === "asc"
        ? [startAt(keyword), endAt(keyword + "\uf8ff")]
        : [startAt(keyword + "\uf8ff"), endAt(keyword)];
    if (orderField !== "email") {
      queriesKeyword.unshift(orderBy("email") as any);
    }

    queriesKeyword.push(
      ...[orderBy("email"), startAt(keyword), endAt(keyword + "\uf8ff")]
    );
    queries.push(...keywordQueries);
  }

  if (page > 1) {
    const lastDoc = await getLastVisibleDoc(
      query(adminRef, ...queries),
      page,
      Number(size || 5)
    );
    queries.push(startAfter(lastDoc));
  }
  const managersDocsRef = await getDocs(
    query(adminRef, ...queries, limit(size || 5))
  );
  const managers = managersDocsRef.docs.slice(0, 5).map((d) => ({
    ...(d.data() as IAdminDoc),
    id: d.id,
  }));
  const total = await getCountFromServer(query(adminRef, ...queriesKeyword));
  return { meta: { total: total.data().count }, data: managers };
};

export const updateActiveAdmin = async (id: string, isActive: boolean) => {
  await updateDoc(doc(adminRef, id), {
    isActive,
  });

  const newAdmin = await getDoc(doc(adminRef, id));
  return { id: newAdmin.id, ...newAdmin.data() };
};

export const getManagerById = async (id: string) => {
  const existedManager = await getDoc(doc(adminRef, id));
  if (!existedManager) return undefined;

  const manager = existedManager.data() as IAdminDoc;
  return { ...manager, id: existedManager.id };
};
