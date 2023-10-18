import useSWR from "swr";
import { useState } from "react";
import { unique } from "@/lib/utils";
import { getURL } from "@/lib/utils";
import { groupByProperty } from "@/lib/utils";

//* Components
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import CategoryHighlight from "@/components/CategoryHighlight";

export default function HomePage() {
  const [filter, setFilter] = useState({ city: "", category: "" });

  const { data: events, isLoading, error } = useSWR(getURL(filter));

  function handleUpdateFilter(filterObject) {
    setFilter((currentFilter) => ({ ...currentFilter, ...filterObject }));
  }
  const groupedCategoryEvents = groupByProperty(events, "category");
  const groupedCityEvents = groupByProperty(events, "city");

  return (
    <>
      {groupedCategoryEvents.map((category) => (
        <CategoryHighlight key={category.name} category={category} />
      ))}
    </>
  );
}
