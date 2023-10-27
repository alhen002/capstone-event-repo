//* Components
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import CategoryHighlight from "@/components/CategoryHighlight";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import styled from "styled-components";
import useSWR from "swr";
import useFilters from "@/hooks/useFilters";
import { getCategoryURL } from "@/lib/utils";
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 36rem;
  margin-inline: auto;
  justify-content: center;
`;

export default function HomePage() {
  const { filters, reset, onChange } = useFilters({ category: "", city: "" });

  const {
    data: categories,
    isLoading,
    error,
  } = useSWR(getCategoryURL(filters));

  if (isLoading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <StyledContainer>
        <SearchBar />
        <FilterBar filters={filters} onChange={onChange} reset={reset} />
      </StyledContainer>
      {categories?.length ? (
        categories.map((category) => (
          <CategoryHighlight key={category.name} category={category} />
        ))
      ) : (
        <p>Sorry, nothing found based on your filters. Please reset.</p>
      )}
    </>
  );
}
