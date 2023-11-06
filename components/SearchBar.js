import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import SearchIcon from "./ui/icons/Search";

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
  grid-column: 3;
`;

const StyledSearchInput = styled.input`
  transition: 2s;
`;

const StyledSearchButton = styled(Button)`
  place-self: center;
  align-self: center;
  grid-column: 3;
`;

export default function SearchBar({
  handleToggleSearch,
  handleSearchClose,
  searchOpen,
}) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/events/search?q=${inputValue}`);
    setInputValue("");
  }

  return (
    <>
      {searchOpen ? (
        <SearchBarContainer>
          <StyledForm onSubmit={handleSubmit}>
            <label>
              <StyledSearchInput
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
      ) : (
        <StyledSearchButton onClick={handleToggleSearch} variant="none">
          <SearchIcon />
        </StyledSearchButton>
      )}
    </>
  );
}
