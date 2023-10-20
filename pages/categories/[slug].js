import { useRouter } from "next/router";
import styled from "styled-components";
//* COMPONENTS
import EventList from "@/components/EventList";
import FilterBar from "@/components/FilterBar";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Button from "@/components/Button";
import useSWR from "swr";
import { getCategoryURL } from "@/lib/utils";
import useFilters from "@/hooks/useFilters";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 36rem;
  margin-inline: auto;
  margin-block: 2rem;
`;

export default function Category() {
  const router = useRouter();
  const { slug } = router.query;
  const { filters, reset, onChange } = useFilters({ city: "", category: "" });
  const {
    data: categories,
    isLoading,
    error,
  } = useSWR(getCategoryURL(filters));

  const foundCategory = categories?.find((category) => category.slug === slug);

  if (isLoading) return <Loading>Category not found</Loading>;
  if (error)
    return (
      <Error>{`${error.status} | ${error.statusText} | ${error.message}`}</Error>
    );

  return (
    <>
      <h1>{foundCategory?.name}</h1>
      <StyledContainer>
        <Button onClick={() => router.back()}>Back</Button>
        <FilterBar filters={filters} onChange={onChange} reset={reset} />
      </StyledContainer>

      {foundCategory ? (
        <EventList events={foundCategory.events} />
      ) : (
        <Error>No Events found, for this category.</Error>
      )}
    </>
  );
}
