import styled from "styled-components";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import Navigation from "./Navigation";
import MenuToggle from "./MenuToggle";

const StyledHeader = styled.header`
  background: var(--mid-grey);
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
  const ref = useRef();

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setMenuOpen(false);
  //     }
  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [ref]);

  function handleToggleMenu() {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }

  function handleMenuClose() {
    setMenuOpen(false);
  }

  return (
    <div ref={ref}>
      <StyledHeader>
        <LogoWrapper>
          <Link href="/">Event Collective</Link>
        </LogoWrapper>

        <MenuToggle menuOpen={menuOpen} handleToggleMenu={handleToggleMenu} />
        {menuOpen && (
          <Navigation handleMenuClose={handleMenuClose} menuOpen={menuOpen} />
        )}
      </StyledHeader>
    </div>
  );
}
