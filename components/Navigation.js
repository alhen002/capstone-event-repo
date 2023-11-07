import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { animated, useSpring } from "react-spring";
const StyledContainer = styled.div`
  background: var(--background);
  z-index: 90;
  margin: 0;
  position: fixed;
  top: 80px;
  height: 100%;
  width: 100vw;
  display: grid;
  place-items: left;
  padding: 2rem;
  background: var(--background);
`;

const StyledIconContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding-top: 2rem;
`;

const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: left;
  display: flex;
  gap: 2rem;
`;

const StyledIcon = styled.svg`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  color: ${(props) =>
    props.$active ? "var(--primary)" : "ver(--text-accent)"};
  text-decoration-thickness: 3px;
  text-decoration-color: ${(props) =>
    props.$active ? "var(--primary)" : "var(--black)"};
`;
export default function Navigation({ handleMenuClose, menuOpen }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const springs = useSpring({
    from: { y: -100 },
    to: { y: 0 },
  });
  return (
    <StyledContainer as={animated.div} style={{ ...springs }}>
      <StyledNavigation>
        <StyledLink href="/" $active={router.pathname === "/"}>
          <div onClick={handleMenuClose}>home</div>
        </StyledLink>
        {session?.user && (
          <>
            <StyledLink
              href="/events/create"
              $active={router.pathname === "/events/create"}
            >
              <div onClick={handleMenuClose}>create</div>
            </StyledLink>
            <StyledLink
              href="/events/ownedEvents"
              $active={router.pathname === "/events/ownedEvents"}
            >
              <div onClick={handleMenuClose}>owned events</div>
            </StyledLink>
            <StyledLink
              href="/events/attendingEvents"
              $active={router.pathname === "/events/attendingEvents"}
            >
              <div onClick={handleMenuClose}>attending events</div>
            </StyledLink>
          </>
        )}
        {!session?.user ? (
          <Button
            github
            onClick={() => {
              signIn("github");
            }}
          >
            login
          </Button>
        ) : (
          <Button onClick={() => signOut()}>logout</Button>
        )}
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
      </StyledNavigation>
    </StyledContainer>
  );
}
