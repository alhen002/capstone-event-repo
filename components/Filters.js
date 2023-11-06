import styled from "styled-components";
import useSWR from "swr";
import Paragraph from "./ui/Paragraph";
import Button from "./Button";
import { useRouter } from "next/router";
import ResetButton from "@/components/ResetButton";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  align-items: center;
  padding-inline: 1rem;
`;

const StyledTextBoxCities = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: var(--text-accent);
  padding: 1rem 2rem;
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
  padding: 1rem 2rem;
`;

const StyledCategoryOptions = styled.option``;

export default function FilterBar({ onChange, filters, type, reset }) {
  const { data: cities } = useSWR("/api/events/cities");
  const { data: categories } = useSWR("/api/categories");
  const router = useRouter();

  return (
    <>
      <StyledContainer>
        {type === "city" && (
          <>
            <StyledTextBoxCities>
              <Paragraph color={"accent"}>
                find curated, community-driven events in &nbsp;
                <label htmlFor="city"></label>
                <StyledCitySelector
                  id="city"
                  name="city"
                  onChange={onChange}
                  value={filters.city}
                >
                  <option value="">select a city</option>
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
              ))}{" "}
              <ResetButton reset={reset}>Reset</ResetButton>
            </StyledCategoryBox>
          </>
        )}
      </StyledContainer>
    </>
  );
}
