import styled from "styled-components";
import Menu from "./Menu";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
  background: var(--mid-grey);
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  padding: 0.5rem;
  z-index: 99;
`;

const StyledNavigation = styled.nav`
  padding: 1rem;
  position: fixed;
  background: #ffffff70;
  justify-content: center;
  display: flex;
  margin-top: 4.5rem;
  z-index: 100;
  border-bottom: 2px solid black;
  width: 100%;
  position: fixed;
  gap: 1rem;
  backdrop-filter: blur(5px);
`;

const LogoWrapper = styled.div`
  padding-left: 1rem;
  color: var(--bright-green);
`;

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  function handleToggleMenu() {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }

  function handleMenuClose() {
    setMenuOpen(false);
  }

  return (
    <div ref={ref}>
      <StyledHeader>
        <LogoWrapper>Logo</LogoWrapper>
        <Menu menuOpen={menuOpen} handleToggleMenu={handleToggleMenu} />
      </StyledHeader>
      {menuOpen && (
        <StyledNavigation>
          <Link href="/" className={router.pathname === "/" && "active"}>
            <div onClick={handleMenuClose}>home</div>
          </Link>
          <Link
            href="/events/create"
            className={router.pathname === "/events/create" && "active"}
          >
            <div onClick={handleMenuClose}>create</div>
          </Link>
        </StyledNavigation>
      )}
    </div>
  );
}
