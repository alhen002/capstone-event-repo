import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 36rem;
`;

const StyledLabel = styled.label``;
const StyledSelect = styled.select``;

export default function Select({ title, required, options }) {
  return (
    <StyledContainer>
      <StyledLabel
        htmlFor={title.toLowerCase()}
        id={`${title.toLowerCase()}_label`}
      >
        {title}
        <span>{required && `*`}</span>
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
      </StyledLabel>
    </StyledContainer>
  );
}
