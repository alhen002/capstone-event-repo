import styled from "styled-components";

const StyledHeading = styled.h1`
  display: flex;
  font-size: 2.25rem;
  font-weight: 600;
  padding-inline: 1rem;
  align-items: center;
`;

export default function Heading({ children }) {
  return <StyledHeading>{children}</StyledHeading>;
}
