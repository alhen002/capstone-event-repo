import styled from "styled-components";
import Button from "./Button";
import useSWR from "swr";
const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  align-items: center;
`;
export default function FilterBar({ onChange, filters, reset, type }) {
  const { data: cities } = useSWR("/api/events/cities");
  const { data: categories } = useSWR("/api/categories");

  return (
    <>
      <StyledContainer>
        {type === "city" && (
          <>
            <label htmlFor="city">City:</label>
            <select
              id="city"
              name="city"
              onChange={onChange}
              value={filters.city}
            >
              <option>All</option>
              {cities?.map((city) => (
                <option key={city.name}>{city.name}</option>
              ))}
            </select>
          </>
        )}
        {type === "category" && (
          <>
            <label htmlFor="category">Categories:</label>
            <select
              id="category"
              name="category"
              onChange={onChange}
              value={filters.category}
            >
              <option>All</option>
              {categories?.map((category) => (
                <option key={category.name}>{category.name}</option>
              ))}
            </select>
          </>
        )}
        <Button variant="delete" onClick={reset}>
          Reset
        </Button>
      </StyledContainer>
    </>
  );
}
