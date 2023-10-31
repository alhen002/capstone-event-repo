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

export default function TextArea({ title, required }) {
  return (
    <StyledContainer>
      <StyledLabel
        htmlFor={title.toLowerCase()}
        id={`${title.toLowerCase()}_label`}
      >
        {title}
        <span>{required && `*`}</span>
      </StyledLabel>
      <StyledTextarea
        id={title.toLowerCase()}
        placeholder={title}
        rows="5"
        name={title.toLowerCase()}
        aria-labelledby={`${title.toLowerCase()}_label`}
      />
    </StyledContainer>
  );
}
