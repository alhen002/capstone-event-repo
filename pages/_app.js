import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
// * utils
import fetcher from "@/lib/fetcher";

//* components
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider>
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <GlobalStyle />
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
