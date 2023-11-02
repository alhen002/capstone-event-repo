import Header from "./Header";
import styled from "styled-components";
const StyledMain = styled.main`
  height: 100vh;
  padding-block: 0;

  background-color: var(--background);
`;

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <StyledMain>{children}</StyledMain>
    </>
  );
}
