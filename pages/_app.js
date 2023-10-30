import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import Notification from "@/components/Notification";
// * utils
import fetcher from "@/lib/fetcher";

//* components
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider>
        <ThemeProvider>
          <SWRConfig value={{ fetcher }}>
            <Layout>
              <GlobalStyle />
              <Notification />
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
