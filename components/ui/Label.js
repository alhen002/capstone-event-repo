import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  color: var(--text-on-primary);
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 1px solid var(--text-on-primary);
  gap: 0.625rem;
  border-radius: 2.5rem;
`;

export default function Label({ children, onClick }) {
  return <StyledButton onCLick={onClick}>{children}</StyledButton>;
}
