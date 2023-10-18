import { useState } from "react";

export default function FilterBar({ onFilter, cities, categories, filter }) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
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
          >
            {cities &&
              cities.map((city) => (
                <option
                  key={city}
                  defaultValue={filter.queryCity === city ? true : false}
                >
                  {city}
                </option>
              ))}
          </select>
          <label htmlFor="queryCategory">Category:</label>

          <select
            id="queryCategory"
            onChange={(e) => onFilter({ category: e.target.value })}
          >
            {categories &&
              categories.map((category) => (
                <option
                  key={category}
                  defaultValue={
                    filter.queryCategory === category ? true : false
                  }
                >
                  {category}
                </option>
              ))}
          </select>
          <button onClick={() => onFilter({ category: "", city: "" })}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
