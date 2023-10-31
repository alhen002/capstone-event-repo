import styled from "styled-components";
import Button from "../Button";

const StyledForm = styled.form`
  padding-top: 3rem;
  margin-inline: auto;
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
  max-width: 36rem;
  padding-inline: 1rem;
  flex-direction: column;
`;
const StyledFieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  display: flex;
`;

const StyledLegend = styled.legend`
  font-size: 2rem;
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 2rem;
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
        {index !== 4 && <Button>Next</Button>}
      </StyledContainer>
    </StyledForm>
  );
}
