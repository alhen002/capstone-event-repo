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

const StyledFieldSet = styled.fieldset`
  border: none;
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
  handleCreateEvent,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    handleNext();
  }

  return (
    <StyledForm onSubmit={handleSubmit} $display={isVisible}>
      <StyledFieldSet>
        {legend && <StyledLegend>{legend}</StyledLegend>}
        {children}
        <StyledContainer>
          {index !== 4 ? (
            <Button variant="confirm">Next</Button>
          ) : (
            <Button variant="confirm" onClick={handleCreateEvent}>
              Create
            </Button>
          )}
        </StyledContainer>
      </StyledFieldSet>
    </StyledForm>
  );
}
