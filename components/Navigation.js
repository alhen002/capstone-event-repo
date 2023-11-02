import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
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
  background: var(--background);
`;
const StyledMenuContainer = styled.div`
  position: absolute;
  left: 15px;
  top: 15px;
`;

const StyledIconContainer = styled.div`
  display: flex;
  position: absolute;
  gap: 1rem;
  bottom: 25px;
  left: 25px;
`;

const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: flex;
  gap: 2rem;
`;

const StyledIcon = styled.svg`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  color: var(--primary);
  font-weight: bold;
  text-decoration: ${(props) => (props.$active ? "underline" : "none")};
  text-decoration-thickness: 3px;
  text-decoration-color: ${(props) =>
    props.$active ? "var(--bright-green)" : "var(--black)"};
`;

export default function Navigation({ handleMenuClose, menuOpen }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

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
              <div onClick={handleMenuClose}>Owned Events</div>
            </StyledLink>
            <StyledLink
              href="/events/attendingEvents"
              $active={router.pathname === "/events/attendingEvents"}
            >
              <div onClick={handleMenuClose}>Attending Events</div>
            </StyledLink>
          </>
        )}

        {!session?.user ? (
          <Button
            onClick={() => {
              signIn("github");
            }}
          >
            Login
          </Button>
        ) : (
          <Button onClick={() => signOut()}>Logout</Button>
        )}
      </StyledNavigation>
      <StyledIconContainer>
        <StyledIcon
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={theme === "dark" ? "var(--deselected)" : "var(--selected)"}
          onClick={() => setTheme("light")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </StyledIcon>

        <StyledIcon
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={theme === "light" ? "var(--deselected)" : "var(--selected)"}
          onClick={() => setTheme("dark")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </StyledIcon>
      </StyledIconContainer>
    </StyledContainer>
  );
}
