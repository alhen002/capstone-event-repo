import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import SearchIcon from "./ui/Icons/Search";

const StyledForm = styled.form`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  place-self: end;
  align-self: center;
  grid-column: 3;
`;

export default function SearchBar() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  function handleToggleSearch() {
    setSearchOpen(!searchOpen);
  }

  function handleSearchClose() {
    setSearchOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/events/search?q=${inputValue}`);
    setInputValue("");
  }

  return (
    <SearchBarContainer>
      {searchOpen ? (
        <StyledForm onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="Search..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </label>
          {inputValue.length == 0 ? (
            <Button onClick={handleToggleSearch}>
              <SearchIcon />
            </Button>
          ) : (
            <Button variant="confirm">Search</Button>
          )}
        </StyledForm>
      ) : (
        <Button onClick={handleToggleSearch}>
          <SearchIcon />
        </Button>
      )}
    </SearchBarContainer>
  );
}
