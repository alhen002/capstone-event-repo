import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  padding-inline: 2rem;
  padding-block: 1rem;
  border-radius: 5px;
  font-family: inherit;
  background-color: ${(props) => {
    switch (props.$color) {
      case "green":
        return "#63F287";
      case "purple":
        return "#C4AEF2";
      default:
        return "grey";
    }
  }};
`;

export default function Button({ href, children, color }) {
  return (
    <StyledLink $color={color} href={href}>
      {children}
    </StyledLink>
  );
}
