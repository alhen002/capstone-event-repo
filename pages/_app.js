import GlobalStyle from "../styles";
import { SWRConfig } from "swr";

// * utils
import fetcher from "@/lib/fetcher";

//* components
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <GlobalStyle />
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </>
  );
}
