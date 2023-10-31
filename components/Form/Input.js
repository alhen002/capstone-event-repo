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
const StyledInput = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  color: var(--primary);
  border: 1px solid var(--primary);
  background-color: var(--background);
  width: 100%;
`;

export default function Input({ title, type, required, min, autoComplete }) {
  return (
    <StyledContainer>
      <StyledLabel
        htmlFor={title.toLowerCase()}
        id={`${title.toLowerCase()}_label`}
      >
        {title}
        <span>{required && `*`}</span>
      </StyledLabel>
      <StyledInput
        type={type}
        min={min}
        placeholder={title}
        id={title.toLowerCase()}
        name={title.toLowerCase()}
        aria-labelledby={`${title.toLowerCase()}_label`}
        required={required}
        autoComplete={autoComplete}
      />
    </StyledContainer>
  );
}
