import styled from "styled-components";
import Image from "next/image";

const StyledPreviewImage = styled(Image)`
  object-fit: cover;
  border-radius: 30px;
  border: solid 2px var(--white);
`;

const AttendingUsersContainer = styled.div`
  display: flex;
`;

export default function AttendingUsersPreview({ attendingUsers }) {
  return (
    <AttendingUsersContainer>
      <p>Also attending:</p>
      {attendingUsers.map((attendingUser) => (
        <StyledPreviewImage
          key={attendingUser._id}
          height={30}
          width={30}
          layout={true}
          src={attendingUser.image}
          alt={attendingUser.name}
        />
      ))}
    </AttendingUsersContainer>
  );
}
