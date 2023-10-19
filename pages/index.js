//* Components
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import CategoryHighlight from "@/components/CategoryHighlight";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 36rem;
  margin-inline: auto;
  justify-content: center;
`;

export default function HomePage({
  groupedCategoryEvents,
  isLoading,
  error,
  filters,
  reset,
  onChange,
}) {
  console.log("groupedCategoryEvents:", groupedCategoryEvents);
  if (isLoading) return <Loading />;

  if (error) return <Error>{error.message}</Error>;
  return (
    <>
      <StyledContainer>
        <SearchBar />
        <FilterBar
          groupedCategoryEvents={groupedCategoryEvents}
          filters={filters}
          onChange={onChange}
          reset={reset}
        />
      </StyledContainer>
      {groupedCategoryEvents.map((category) => (
        <CategoryHighlight key={category.name} category={category} />
      ))}
    </>
  );
}
