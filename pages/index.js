import useSWR from "swr";
import { useState } from "react";
import { unique } from "@/lib/utils";
import { getURL } from "@/lib/utils";
//components
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import EventList from "@/components/EventList";
import FilterBar from "@/components/FilterBar";

export default function HomePage() {
  const [filter, setFilter] = useState({ city: "", category: "" });

  const { data: events, isLoading, error } = useSWR(getURL(filter));

  function handleUpdateFilter(filterObject) {
    setFilter((currentFilter) => ({ ...currentFilter, ...filterObject }));
  }

  const cities = unique(events, "city");
  const categories = unique(events, "category");

  return (
    <>
      <FilterBar
        filter={filter}
        onFilter={handleUpdateFilter}
        categories={categories}
        cities={cities}
      />
      {isLoading && <Loading />}
      {error && (
        <Error>{`${error.status} | ${error.statusText} | ${error.message}`}</Error>
      )}
      {events && (
        <>
          {events?.length === 0 && <p>Sorry no events were found.</p>}
          <EventList events={events} />
        </>
      )}
    </>
  );
}
