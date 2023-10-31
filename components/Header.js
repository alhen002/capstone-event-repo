import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import Navigation from "./Navigation";
import MenuToggle from "./MenuToggle";

const StyledHeader = styled.header`
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  top: 0;
  right: 0;
  left: 0;
  padding: 0.5rem;
  z-index: 99;
`;

const LogoWrapper = styled.div`
  padding-left: 1rem;
  place-self: center;
  color: var(--bright-green);
  place-self: center;
  grid-column: 2;
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleToggleMenu() {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }

  function handleMenuClose() {
    setMenuOpen(false);
  }

  return (
    <StyledHeader>
      <MenuToggle menuOpen={menuOpen} handleToggleMenu={handleToggleMenu} />
      {menuOpen && (
        <Navigation handleMenuClose={handleMenuClose} menuOpen={menuOpen} />
      )}
      <LogoWrapper>
        <Link href="/">Event Collective</Link>
      </LogoWrapper>
    </StyledHeader>
  );
}
