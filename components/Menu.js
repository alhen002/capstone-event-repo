import styled from "styled-components";

const BurgerMenu = styled.div`
  cursor: pointer;
  padding: 5px;
  color: #63f287;
  font-size: xx-large;
  grid-column: 3;
  justify-self: end;
`;

export default function Menu({ menuOpen, handleToggleMenu }) {
  return (
    <BurgerMenu onClick={handleToggleMenu}>{menuOpen ? "x" : "☰"}</BurgerMenu>
  );
}
