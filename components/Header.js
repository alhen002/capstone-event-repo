import styled from "styled-components";

const StyledHeader = styled.header`
  background: lightgrey;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 1 rem;
  padding: 0.5rem;
`;

export default function Header() {
  return (
    <StyledHeader>
      <div>Logo</div>
    </StyledHeader>
  );
}
