import Header from "./Header";
import styled from "styled-components";
const StyledMain = styled.main`
  height: 100vh;
  padding-block: 6rem;
  padding-inline: 1rem;
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
