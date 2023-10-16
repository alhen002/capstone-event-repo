import Header from "./Header";
import styled from "styled-components";

const StyledMain = styled.main`
  height: 100vh;
  padding-block: 6rem;
  padding-inline: 1rem;
`;

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <StyledMain>{children}</StyledMain>
    </>
  );
}
