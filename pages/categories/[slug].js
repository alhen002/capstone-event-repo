import { useRouter } from "next/router";

//* COMPONENTS
import EventList from "@/components/EventList";
import FilterBar from "@/components/FilterBar";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function Category({
  groupedCategoryEvents,
  groupedCityEvents,
  isLoading,
  error,
  filters,
  onChange,
  reset,
}) {
  const router = useRouter();
  const { slug } = router.query;

  const foundCategory = groupedCategoryEvents.find(
    (category) => category.slug === slug
  );

  if (isLoading) return <Loading>Category not found</Loading>;
  if (error)
    return (
      <Error>{`${error.status} | ${error.statusText} | ${error.message}`}</Error>
    );

  return (
    <>
      <FilterBar
        filters={filters}
        groupedCategoryEvents={groupedCategoryEvents}
        groupedCityEvents={groupedCityEvents}
        onChange={onChange}
        reset={reset}
      />
      {foundCategory ? (
        <EventList events={foundCategory.events} />
      ) : (
        <Error>No Events found, for this category.</Error>
      )}
    </>
  );
}
