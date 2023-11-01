import styled from "styled-components";
import Button from "../Button";

const StyledFieldset = styled.fieldset`
  margin-top: 3rem;
  border: none;
  margin-inline: auto;
  max-width: 36rem;
  display: ${(props) => {
    switch (props.$display) {
      case true:
        return "block";
      case false:
        return "none";
      default:
        return "none";
    }
  }};
`;

const StyledLegend = styled.legend`
  font-size: 2rem;
  color: var(--primary);
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;
export default function Step({
  isVisible,
  children,
  handleNext,
  legend,
  index,
  handleBack,
  handleSubmit,
  step,
}) {
  return (
      <StyledFieldset $display={isVisible}>
        {legend && <StyledLegend>{legend}</StyledLegend>}
        {children}
          <StyledContainer>
              {step > 0 && <Button onClick={handleBack}>Back</Button>}
              {index !== 4 && <Button onClick={handleNext} variant="confirm">Next</Button>}
              {index === 4 && <Button onClick={(event) => handleSubmit(event)} variant="confirm">Submit</Button>}
          </StyledContainer>
      </StyledFieldset>
  );
}
