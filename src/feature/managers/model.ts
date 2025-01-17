import { db } from "learning/utils/firebase";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { IAdminDb, ICreateAdminInput } from "./type";
import { COLLECTION } from "learning/constants/common";
import { hashPassword } from "learning/utils/common/password";
const adminRef = collection(db, COLLECTION.ADMIN);

export const findAdminByEmail = async (email: string): Promise<IAdminDb> => {
  const existedAdmin = await getDocs(
    query(adminRef, where("email", "==", email))
  );
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
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  });

  const newAdmin = await getDoc(newAdminRef);
  return { id: newAdmin.id, ...newAdmin.data() };
};
