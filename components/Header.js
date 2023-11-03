import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import Navigation from "./Navigation";
import MenuToggle from "./MenuToggle";
import { useSession } from "next-auth/react";
import SearchBar from "./SearchBar";

const StyledHeader = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: minmax(80px, 1fr) 3fr 1fr;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  padding: 0.5rem;
  z-index: 99;
  height: 80px;
  background: var(--background);
  transition: 300ms;
`;

const LogoWrapper = styled.div`
  padding-left: 1rem;
  color: var(--primary);
  place-self: center;
  align-self: center;
  grid-column: 2;
`;

const StyledText = styled.p`
  color: var(--primary);
  font-size: 16px;
  place-self: start;
  align-self: center;
  grid-column: 2;
  padding: 5px;
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);

  function handleToggleSearch() {
    setSearchOpen(!searchOpen);
  }

  function handleSearchClose() {
    setSearchOpen(false);
  }

  function handleToggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function handleMenuClose() {
    setMenuOpen(false);
  }

  return (
    <>
      <StyledHeader>
        <MenuToggle menuOpen={menuOpen} handleToggleMenu={handleToggleMenu} />

        {searchOpen ? (
          ""
        ) : !session?.user ? (
          <LogoWrapper>
            <Link href="/">Event Collective</Link>
          </LogoWrapper>
        ) : (
          <StyledText>
            <Link href="/">Hi {session?.user.name}</Link>
          </StyledText>
        )}

        <SearchBar
          handleToggleSearch={handleToggleSearch}
          handleSearchClose={handleSearchClose}
          searchOpen={searchOpen}
        />
      </StyledHeader>
      {menuOpen && (
        <Navigation handleMenuClose={handleMenuClose} menuOpen={menuOpen} />
      )}
    </>
  );
}
