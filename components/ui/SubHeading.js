import styled from "styled-components";

const StyledSubHeading = styled.h2`
  font-family: Inter, sans-serif;
  font-size: 1.5rem;
  min-width: 100%;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem;
  color: var(--text-on-primary);
`;

export default function SubHeading({ children }) {
  return <StyledSubHeading>{children}</StyledSubHeading>;
}
