import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
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

export default function LinkButton({ href = "/", children = "Back", variant }) {
  return (
    <StyledLink $variant={variant} href={href}>
      {children}
    </StyledLink>
  );
}
