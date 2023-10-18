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
  const { filters, reset, onChange } = useFilters({ city: "", category: "" });
  const { data: events, isLoading, error } = useSWR(getURL(filters), fetcher);

  const groupedCategoryEvents = groupByProperty(events, "category");
  // const groupedCityEvents = groupByProperty(events, "city");
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <GlobalStyle />
          <Component
            {...pageProps}
            filters={filters}
            onChange={onChange}
            groupedCategoryEvents={groupedCategoryEvents}
            reset={reset}
            isLoading={isLoading}
            error={error}
          />
        </Layout>
      </SWRConfig>
    </>
  );
}
