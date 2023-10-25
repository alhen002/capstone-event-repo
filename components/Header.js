import styled from "styled-components";
import Menu from "./Menu";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut, signIn } from "next-auth/react";
import Button from "./Button";
import Image from "next/image";

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

const StyledNavigation = styled.nav`
  padding: 1rem;
  position: fixed;
  display: flex;
  flex-direction: column;
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

const StyledLink = styled(Link)`
  color: var(--black);
  font-weight: bold;
  text-decoration: ${(props) => (props.$active ? "underline" : "none")};
  text-decoration-thickness: 3px;
  text-decoration-color: ${(props) =>
    props.$active ? "var(--bright-green)" : "var(--black)"};
`;

const LogoWrapper = styled.div`
  padding-left: 1rem;
  place-self: center;
  color: var(--bright-green);
  place-self: center;
  grid-column: 2;
`;

const StyledText = styled.p`
  color: var(--black);
  font-weight: bold;
`;

export default function Header() {
  const { data: session } = useSession();
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
        <LogoWrapper>
          <Link href="/">Event Collective</Link>
        </LogoWrapper>

        <Menu menuOpen={menuOpen} handleToggleMenu={handleToggleMenu} />
      </StyledHeader>
      {menuOpen && (
        <StyledNavigation>
          {session?.user && (
            <>
              <Image
                alt={session.user.name}
                src={session.user.image}
                height={60}
                width={60}
              />
              <StyledText>Hi, {session.user.name} </StyledText>
            </>
          )}

          <StyledLink href="/" $active={router.pathname === "/"}>
            <div onClick={handleMenuClose}>Home</div>
          </StyledLink>
          <StyledLink
            href="/events/create"
            $active={router.pathname === "/events/create"}
          >
            <div onClick={handleMenuClose}>Create</div>
          </StyledLink>

          {!session?.user ? (
            <Button onClick={() => signIn()}>Login</Button>
          ) : (
            <Button onClick={() => signOut()}>Logout</Button>
          )}
        </StyledNavigation>
      )}
    </div>
  );
}
