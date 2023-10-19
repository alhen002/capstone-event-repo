import { useState } from "react";
import useFilters from "@/hooks/useFilters";
import styled from "styled-components";
import Button from "./Button";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  align-items: center;
`;
export default function FilterBar({
  onChange,
  groupedCityEvents,
  groupedCategoryEvents,
  filters,
  reset,
}) {
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <StyledDiv>
      <Button color="purple" onClick={toggleFilter}>
        Filter{" "}
      </Button>
      {isFilterVisible && (
        <div className="filter-options">
          {groupedCityEvents && (
            <>
              <label htmlFor="city">City:</label>
              <select
                id="city"
                name="city"
                onChange={onChange}
                value={filters.city}
              >
                <option>All</option>
                {groupedCityEvents.map((city) => (
                  <option key={city.name}>{city.name}</option>
                ))}
              </select>
            </>
          )}
          {groupedCategoryEvents && (
            <>
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                onChange={onChange}
                value={filters.category}
              >
                <option>All</option>
                {groupedCategoryEvents.map((category) => (
                  <option key={category.name}>{category.name}</option>
                ))}
              </select>
            </>
          )}
          <Button color="rose" onClick={reset}>
            Reset
          </Button>
        </div>
      )}
    </StyledDiv>
  );
}
