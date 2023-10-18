import { useState } from "react";
import useFilters from "@/hooks/useFilters";

export default function FilterBar({ onFilter, cities, categories, filter }) {
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleReset = () => {
    onFilter({ category: "", city: "" });
  };

  return (
    <div className="filter-container">
      <button className="filter-toggle" onClick={toggleFilter}>
        Filter{" "}
        <i
          className={`fas ${
            isFilterVisible ? "fa-chevron-up" : "fa-chevron-down"
          }`}
        ></i>
      </button>
      {isFilterVisible && (
        <div className="filter-options">
          <label htmlFor="queryCity">City:</label>
          <select
            id="queryCity"
            onChange={(e) => onFilter({ city: e.target.value })}
            value={filter.city || ""}
          >
            <option value="">All</option>
            {cities &&
              cities.map((city) => (
                <option key={city} value={city.toLowerCase()}>
                  {city}
                </option>
              ))}
          </select>
          <label htmlFor="queryCategory">Category:</label>

          <select
            id="queryCategory"
            onChange={(e) => onFilter({ category: e.target.value })}
            value={filter.category || ""}
          >
            <option value="">All</option>
            {categories &&
              categories.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
          </select>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}
