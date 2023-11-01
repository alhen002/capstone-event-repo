import styled from "styled-components";

const StyledButton = styled.button`
  position: relative;
  padding-inline: 1rem;
  padding: 0.5rem 1.5rem;
  border: none;
  min-height: 1rem;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  background-color: ${(props) => {
    switch (props.$variant) {
      case "confirm":
        return "var(--bright-green)";
      case "delete":
        return "var(--rose)";
      default:
        return "var(--mid-grey)";
    }
  }};
  color: ${(props) => {
    switch (props.$variant) {
      case "confirm":
        return "var(--black)";
      case "delete":
        return "var(--black)";
      default:
        return "var(--white)";
    }
  }};
`;
export default function Button({ children, variant, onClick }) {
  return (
    <StyledButton onClick={onClick} $variant={variant}>
      {children}
    </StyledButton>
  );
}
