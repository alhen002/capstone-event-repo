import { useRouter } from "next/router";

//* COMPONENTS
import EventList from "@/components/EventList";
import FilterBar from "@/components/FilterBar";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function Category() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <>
      <p>a category page of {category}</p>
      {/* <FilterBar
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
      )} */}
    </>
  );
}
