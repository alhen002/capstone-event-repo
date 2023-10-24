import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID_DEV,
      clientSecret: process.env.GITHUB_CLIENT_SECRET_DEV,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);

// ist hier noch laut youtube tutotial drin:
// export {handler as GET, handler as POST};
