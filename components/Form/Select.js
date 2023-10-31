import styled from "styled-components";

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
const StyledSelect = styled.select`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  color: var(--primary);
  border: 1px solid var(--primary);
  background-color: var(--background);
  width: 100%;
`;

export default function Select({ title, required, options }) {
  return (
    <StyledContainer>
      <StyledLabel
        htmlFor={title.toLowerCase()}
        id={`${title.toLowerCase()}_label`}
      >
        {title}
        <span>{required && `*`}</span>
      </StyledLabel>
      <StyledSelect
        id={title.toLowerCase()}
        name={title.toLowerCase()}
        aria-labelledby={`${title.toLowerCase()}_label`}
        required={required}
      >
        <option value="">Please pick a {title.toLowerCase()}</option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.toLowerCase().trim().replaceAll(" ", "")}
          >
            {option}
          </option>
        ))}
      </StyledSelect>
    </StyledContainer>
  );
}
