import styled from "styled-components";

const StyledHeading = styled.h1`
  font-size: 2.25rem;
  font-weight: 600;
  padding-inline: 2rem;
`;

export default function Heading({ children }) {
  return <StyledHeading>{children}</StyledHeading>;
}
