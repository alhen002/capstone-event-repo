import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  background-color: var(--bright-green);
  color: var(--black)
  position: relative;
  padding-inline: 1rem;
  padding-block: 1rem;
  border: none;
  min-height: 2rem;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
`;

export default function LinkButton({ url, children }) {
  return <StyledLink href={url}>{children}</StyledLink>;
}

export function BackButton() {
  return <StyledLink href={"/"}> Back </StyledLink>;
}
