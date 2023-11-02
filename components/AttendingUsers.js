import styled from "styled-components";
import Image from "next/image";

const AttendingUsersContainer = styled.div`
  display: flex;
`;
const StyledPreviewImage = styled(Image)`
  object-fit: cover;
  border-radius: 30px;
  border: solid 2px #f5f289;
  background: #f5f289;
`;

export default function AttendingUsersPreview({ attendingUsers }) {
  return (
    <AttendingUsersContainer>
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
