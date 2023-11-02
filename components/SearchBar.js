import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const StyledForm = styled.form`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  align-items: center;
`;

export default function SearchBar() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/events/search?q=${inputValue}`);
    setInputValue("");
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label>
        Keyword:
        <input
          placeholder="Search Title"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <Button variant="confirm">Search</Button>
    </StyledForm>
  );
}
