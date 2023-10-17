import useSWR from "swr";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import EventList from "@/components/EventList";
import FilterBar from "@/components/FilterBar";
import { useState } from "react";

export default function HomePage() {
  const [filter, setFilter] = useState({});

  const {
    data: events,
    isLoading,
    error,
  } = useSWR(
    `/api/events?queryCategory=${
      filter?.category ? filter.category : ""
    }&queryCity=${filter?.city ? filter.city : ""}`
  );

  function handleUpdateFilter(filterObject) {
    setFilter((currentFilter) => {
      return { ...currentFilter, ...filterObject };
    });
  }

  const categories = events?.reduce(
    (allCategories, curr) => [...allCategories, curr.category],
    []
  );

  const cities = events?.reduce(
    (allCities, curr) => [...allCities, curr.city],
    []
  );

  return (
    <>
      {isLoading && <Loading />}
      {error && (
        <Error>{`${error.status} | ${error.statusText} | ${error.message}`}</Error>
      )}

      {events && (
        <>
          <FilterBar
            onFilter={handleUpdateFilter}
            categories={categories}
            cities={cities}
          />
          {events?.length === 0 && <p>Sorry no events were found.</p>}
          <EventList events={events} />
        </>
      )}
    </>
  );
}
