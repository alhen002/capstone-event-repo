import styled from "styled-components";
import Image from "next/image";

const StyledText = styled.p`
  color: var(--primary);
  font-weight: bold;
`;

const StyledProfileImage = styled(Image)`
  border-radius: 50%;
`;

export default function Greeting({ user }) {
  return (
    <>
      {user ? (
        <>
          <StyledProfileImage
            alt={user.name}
            src={user.image}
            height={50}
            width={50}
          />
          <StyledText>Hi {user.name}</StyledText>
        </>
      ) : (
        <StyledText>Hello, Guest. Please Login.</StyledText>
      )}
    </>
  );
}
