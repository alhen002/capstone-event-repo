import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default function Error({ children }) {
  return (
    <StyledContainer>
      <p>{children}</p>
    </StyledContainer>
  );
}
export { StyledContainer };
