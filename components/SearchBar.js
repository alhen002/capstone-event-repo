import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import SearchIcon from "./icons/Search";
import { animated, useSpring } from "react-spring";

const StyledForm = styled.form`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  align-items: center;
  place-self: center;
  align-self: center;
  grid-column: 2 / 3;
`;

const SearchBarContainer = styled.div`
  place-self: center;
  align-self: center;
  grid-column: 2 / d4;
`;

const StyledSearchInput = styled.input`
  width: 80px;
`;

const StyledSearchButton = styled(Button)`
  place-self: center;
  align-self: center;
  grid-column: 3;
`;

export default function SearchBar({ handleToggleSearch, handleSearchClose }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const springs = useSpring({
    from: { width: "0%" },
    to: { width: "100%" },
  });

  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/events/search?q=${inputValue}`);
    setInputValue("");
    handleSearchClose();
  }

  return (
    <SearchBarContainer>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          <StyledSearchInput
            as={animated.input}
            style={{ ...springs }}
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        {inputValue.length == 0 ? (
          <StyledSearchButton onClick={handleToggleSearch}>
            <SearchIcon />
          </StyledSearchButton>
        ) : (
          <StyledSearchButton variant="confirm">Search</StyledSearchButton>
        )}
      </StyledForm>
    </SearchBarContainer>
  );
}
