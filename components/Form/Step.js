import styled from "styled-components";
import Button from "../Button";

const StyledForm = styled.form`
  margin-top: 3rem;
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
const StyledFieldset = styled.fieldset`
  border: none;
  display: flex;
  margin-top: 3rem;
  align-items: center;
  flex-direction: column;
`;

const StyledLegend = styled.legend`
  font-size: 2rem;
  color: var(--primary);
  font-size: 2rem;
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
  handleBackToStart,
  step,
}) {
  function onSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const address = data[" address-search"];
    if (address) {
      // lol, it actually works
      delete data[" address-search"];
      handleNext({ ...data, address });
    } else {
      handleNext(data);
    }
  }

  return (
    <StyledForm onSubmit={onSubmit} $display={isVisible}>
      <StyledFieldset>
        {legend && <StyledLegend>{legend}</StyledLegend>}
        {children}
      </StyledFieldset>
      <StyledContainer>
        {step > 0 && <Button onClick={handleBackToStart}>Back to Start</Button>}
        {index !== 4 && <Button variant="confirm">Next</Button>}
      </StyledContainer>
    </StyledForm>
  );
}
