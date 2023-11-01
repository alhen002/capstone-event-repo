import styled from "styled-components";
import {useState} from "react";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 36rem;
`;

const StyledLabel = styled.label`
  color: var(--text-accent);
  font-size: 1rem;
  font-family: inherit;
  font-style: normal;
  font-weight: 500;
`;
const StyledTextarea = styled.textarea`
  display: flex;
  padding: 0.75rem;
  font-size: 1rem;
  align-items: center;
  border-radius: 0.75rem;
  color: var(--primary);
  border: 1px solid var(--primary);
  background-color: var(--background);
  width: 100%;
`;

export default function TextArea({ label,name, required, handleSetAllData }) {
    const [value, setValue] = useState("")

    function handleChange(event) {
        setValue(event.target.value);
        handleSetAllData(
            {[name]: event.target.value}
        )
    }

  return (
    <StyledContainer>
      <StyledLabel
        htmlFor={label.toLowerCase()}
        id={`${label.toLowerCase()}_label`}
      >
        {label}
        <span>{required && `*`}</span>
      </StyledLabel>
      <StyledTextarea
          value={value}
          onChange={handleChange}
        id={label.toLowerCase()}
        placeholder={label}
        rows="5"
        name={name}
        aria-labelledby={`${label.toLowerCase()}_label`}
      />
    </StyledContainer>
  );
}
