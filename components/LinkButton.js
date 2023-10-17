import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  position: relative;
  padding-inline: 1rem;
  padding-block: 1rem;
  border: none;
  min-height: 2rem;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  background-color: ${(props) => {
    switch (props.$color) {
      case "green":
        return "var(--bright-green)";
      case "purple":
        return "#C4AEF2";
      default:
        return "var(--mid-grey)";
    }
  }};
  color: ${(props) => {
    switch (props.$color) {
      case "green":
        return "var(--black)";
      case "purple":
        return "#C4AEF2";
      default:
        return "var(--white)";
    }
  }};
`;

export default function LinkButton({ href = "/", children = "Back", color }) {
  return (
    <StyledLink $color={color} href={href}>
      {children}
    </StyledLink>
  );
}
