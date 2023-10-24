import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import clientPromise from "@/db/mongoDB";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    collections: {
      Sessions: "sessions",
    },
  }),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID_DEV,
      clientSecret: process.env.GITHUB_CLIENT_SECRET_DEV,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token, user }) {
      return { ...session, id: token.sub };
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
  },
};

export default NextAuth(authOptions);
