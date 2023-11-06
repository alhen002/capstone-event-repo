import styled from "styled-components";
import Image from "next/image";

const AttendingUsersContainer = styled.div`
  display: flex;
  min-width: 35px;
`;
const StyledPreviewImage = styled(Image)`
  object-fit: cover;
  border-radius: 30px;
  margin-left: -0.5rem;
  background: #f5f289;
  display: inline-block;
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
