import styled from "styled-components";
import Image from "next/image";

const StyledText = styled.p`
  color: var(--black);
  font-weight: bold;
`;

export default function Greeting({ user }) {
  return (
    <>
      {user ? (
        <>
          <Image alt={user.name} src={user.image} height={60} width={60} />
          <StyledText>Hi, {user.name}</StyledText>
        </>
      ) : (
        <StyledText>Hello, Guest. Please Login.</StyledText>
      )}
    </>
  );
}
