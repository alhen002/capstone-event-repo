import styled from "styled-components";
import Image from "next/image";
import Heading from "./ui/Heading";
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
      <Heading>Attending Events</Heading>
      {attendingUsers.slice(0, 10).map((attendingUser) => (
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
