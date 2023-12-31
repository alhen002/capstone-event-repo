import styled from "styled-components";

const ProgressBarSegment = styled.div`
  height: 10px;
  border-radius: 5px;
  flex-grow: 1;
  background-color: ${(props) => {
    switch (props.$color) {
      case "green":
        return "var(--primary)";
      case "mid-grey":
        return "var(--mid-grey)";
      default:
        return "var(--light-grey)";
    }
  }};
`;

const ProgressBarContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  justify-content: center;
  max-width: 36rem;
  margin: auto;
  padding-inline: 2rem;
`;

export default function ProgressBar({ currentStep }) {
  return (
    <ProgressBarContainer>
      <ProgressBarSegment
        $color={currentStep == 0 ? "green" : currentStep > 0 ? "mid-grey" : ""}
      />
      <ProgressBarSegment
        $color={currentStep == 1 ? "green" : currentStep > 1 ? "mid-grey" : ""}
      />
      <ProgressBarSegment
        $color={currentStep == 2 ? "green" : currentStep > 2 ? "mid-grey" : ""}
      />
      <ProgressBarSegment
        $color={currentStep == 3 ? "green" : currentStep > 3 ? "mid-grey" : ""}
      />
    </ProgressBarContainer>
  );
}
