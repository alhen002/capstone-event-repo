export default function FilterBar({ onFilter, cities, categories }) {
  return (
    <>
      <label htmlFor="queryCity">City:</label>
      <select
        id="queryCity"
        onChange={(e) => onFilter({ city: e.target.value })}
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
      >
        <option value="">All</option>
        {categories &&
          categories.map((category) => (
            <option key={category} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
      </select>

      <button onClick={() => onFilter({ category: "", city: "" })}>
        Reset
      </button>
    </>
  );
}
