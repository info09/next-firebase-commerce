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
import { ICreateAdminInput } from "./type";
import { COLLECTION } from "learning/constants/common";
import { hashPassword } from "learning/utils/common/password";

export const createAdmin = async (data: ICreateAdminInput) => {
  const adminRef = collection(db, COLLECTION.ADMIN);

  const exitedAdmin = await getDocs(
    query(adminRef, where("email", "==", data.email))
  );

  if (exitedAdmin.docs.length) {
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
