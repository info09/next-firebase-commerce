import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ICreateAdminInput } from "learning/feature/managers/type";
import { findAdminByEmail } from "learning/feature/managers/model";
import { comparePassword } from "learning/utils/common/password";
import { loginSchema } from "learning/feature/managers/rule";

const adminLogin = async (email: string, password: string) => {
  const existedAdmin = await findAdminByEmail(email);
  if (!existedAdmin) {
    throw Error("This email is not exist!");
  }

  const isMatchPassword = await comparePassword(
    password,
    existedAdmin.password
  );

  if (!isMatchPassword) {
    throw Error("The password is wrong");
  }

  return {
    email: existedAdmin.email,
    id: existedAdmin.id,
  };
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as ICreateAdminInput;

        const data = loginSchema.safeParse({ email, password });
        if (!data.success) {
          const message = JSON.parse(data.error.message);
          throw Error(message.map((i: any) => i.message).join(", "));
        }
        return adminLogin(email, password);
      },
    }),
  ],
  callbacks: {},
};

const authHandler = NextAuth(authOptions);
export { authHandler as GET, authHandler as POST };
