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
      clientId:
        process.env.NODE_ENV === "DEV"
          ? process.env.GITHUB_CLIENT_ID_DEV
          : process.env.GITHUB_CLIENT_ID_PROD,
      clientSecret:
        process.env.NODE_ENV === "DEV"
          ? process.env.GITHUB_CLIENT_SECRET_DEV
          : process.env.GITHUB_CLIENT_SECRET_PROD,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token, user }) {
      return { ...session, id: token.sub };
    },
  },
};

export default NextAuth(authOptions);
