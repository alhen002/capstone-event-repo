import { useRouter } from "next/router";

//* COMPONENTS
import EventList from "@/components/EventList";
import FilterBar from "@/components/FilterBar";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import useFilters from "@/hooks/useFilters";

export default function Category({ groupedCategoryEvents }) {
  const router = useRouter();
  const { category: slug } = router.query;

  const groupedCategory = groupedCategoryEvents.find(
    (category) => category.slug === slug
  );

  console.log(slug);
  console.log(groupedCategoryEvents);
  return (
    <>
      <p></p>
      {/* <FilterBar
        filter={filter}
        onFilter={handleUpdateFilter}
        categories={categories}
        cities={cities}
      />
      {isLoading && <Loading />}
      {error && (
        <Error>{`${error.status} | ${error.statusText} | ${error.message}`}</Error>
      )} */}
      {groupedCategory?.events && (
        <>
          {groupedCategory?.events?.length === 0 && (
            <p>Sorry no events were found.</p>
          )}
          <EventList events={groupedCategory?.events} />
        </>
      )}
    </>
  );
}
