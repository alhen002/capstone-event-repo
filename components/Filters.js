import styled from "styled-components";
import useSWR from "swr";
import Paragraph from "./ui/Paragraph";
import Button from "./Button";
import { useRouter } from "next/router";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  align-items: center;
`;

const StyledTextBoxCities = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: var(--text-accent);
  padding: 2rem;
`;

const StyledCitySelector = styled.select`
  border: none;
  border-bottom: 2px solid var(--primary);
  background: none;
  width: auto;
  color: var(--primary);
`;

const StyledCategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: var(--text-accent);
  padding: 2rem;
`;

const StyledCategoryOptions = styled.option``;

export default function FilterBar({ onChange, filters, type }) {
  const { data: cities } = useSWR("/api/events/cities");
  const { data: categories } = useSWR("/api/categories");
  const router = useRouter();

  console.log(categories);
  console.log(filters);

  return (
    <>
      <StyledContainer>
        {type === "city" && (
          <>
            <StyledTextBoxCities>
              <Paragraph>
                find curated, community-driven event in &nbsp;
                <label htmlFor="city"></label>
                <StyledCitySelector
                  id="city"
                  name="city"
                  onChange={onChange}
                  value={filters.city}
                >
                  <option></option>
                  {cities?.map((city) => (
                    <option key={city.name}>{city.name}</option>
                  ))}
                </StyledCitySelector>
              </Paragraph>
            </StyledTextBoxCities>
          </>
        )}
        {type === "category" && (
          <>
            {/* <label htmlFor="category">Categories:</label>
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
            </select> */}

            <StyledCategoryBox>
              {categories?.map((category) => (
                <Button
                  id="category"
                  name="category"
                  key={category.name}
                  onClick={() =>
                    onChange({
                      target: { name: "category", value: category.name },
                    })
                  }
                  variant={
                    filters.category == category.name ? "primary" : "secondary"
                  }
                >
                  {category.name}
                </Button>
              ))}
            </StyledCategoryBox>
          </>
        )}
      </StyledContainer>
    </>
  );
}
