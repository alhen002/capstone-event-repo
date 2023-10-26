import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Greeting from "./Greeting";
import MenuToggle from "./MenuToggle";

const StyledContainer = styled.div`
  background: #fff;
  z-index: 100;
  margin: 0;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  padding: 2rem;
`;
const StyledMenuContainer = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
`;

const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: flex;
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  color: var(--black);
  font-weight: bold;
  text-decoration: ${(props) => (props.$active ? "underline" : "none")};
  text-decoration-thickness: 3px;
  text-decoration-color: ${(props) =>
    props.$active ? "var(--bright-green)" : "var(--black)"};
`;

export default function Navigation({ handleMenuClose, menuOpen }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <StyledContainer>
      <StyledMenuContainer>
        <MenuToggle menuOpen={menuOpen} handleToggleMenu={handleMenuClose} />
      </StyledMenuContainer>

      <StyledNavigation>
        <Greeting user={session?.user} />
        <StyledLink href="/" $active={router.pathname === "/"}>
          <div onClick={handleMenuClose}>Home</div>
        </StyledLink>
        {session?.user && (
          <>
            <StyledLink
              href="/events/create"
              $active={router.pathname === "/events/create"}
            >
              <div onClick={handleMenuClose}>Create</div>
            </StyledLink>
            <StyledLink
              href="/events/ownedEvents"
              $active={router.pathname === "/events/ownedEvents"}
            >
              <div onClick={handleMenuClose}>owned Events</div>
            </StyledLink>
          </>
        )}

        {!session?.user ? (
          <Button onClick={() => signIn("github")}>Login</Button>
        ) : (
          <Button onClick={() => signOut()}>Logout</Button>
        )}
      </StyledNavigation>
    </StyledContainer>
  );
}
