import styled from "styled-components";

const StyledSubHeading = styled.h2`
  font-family: Inter;
  width: 185px;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  color: var(--text-on-primary);
`;

export default function SubHeading({ children }) {
  return <StyledSubHeading>{children}</StyledSubHeading>;
}
