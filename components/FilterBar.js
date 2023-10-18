import { useState } from "react";
import useFilters from "@/hooks/useFilters";

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
    <div className="filter-container">
      <button className="filter-toggle" onClick={toggleFilter}>
        Filter{" "}
      </button>
      {isFilterVisible && (
        <div className="filter-options">
          <label htmlFor="queryCity">City:</label>
          <select name="city" onChange={onChange} value={filters.city}>
            <option>All</option>
            {groupedCityEvents.map((city) => (
              <option key={city.name}>{city.name}</option>
            ))}
          </select>
          <label htmlFor="queryCategory">Category:</label>
          <select name="category" onChange={onChange} value={filters.category}>
            <option>All</option>
            {groupedCategoryEvents.map((category) => (
              <option key={category.name}>{category.name}</option>
            ))}
          </select>

          <button onClick={reset}>Reset</button>
        </div>
      )}
    </div>
  );
}
