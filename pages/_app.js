import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import useSWR from "swr";

// * utils
import fetcher from "@/lib/fetcher";
import { getURL } from "@/lib/utils";
import { groupByProperty } from "@/lib/utils";
//* hooks
import useFilters from "@/hooks/useFilters";
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
