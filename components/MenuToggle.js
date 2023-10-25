import styled from "styled-components";

const StyledMenuToggle = styled.div`
  cursor: pointer;
  padding: 5px;
  color: #63f287;
  font-size: xx-large;
  grid-column: 3;
  justify-self: end;
`;

export default function MenuToggle({ menuOpen, handleToggleMenu }) {
  return (
    <StyledMenuToggle onClick={handleToggleMenu}>
      {menuOpen ? "x" : "☰"}
    </StyledMenuToggle>
  );
}
