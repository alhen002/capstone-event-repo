import styled from "styled-components";
import Image from "next/image";
import getDate from "@/lib/getDate";
import Button from "./Button";
import { deleteEvent } from "@/lib/api";
import { useRouter } from "next/router";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block: 2rem;
  max-width: 36rem;
  margin-inline: auto;
`;
const StyledHeaderImage = styled(Image)`
  width: 100%;
`;
const StyledTitle = styled.p``;
const StyledEventInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: baseline;
`;
const StyledEventInfo = styled.p`
  justify-self: ${(props) => (props.$right ? "end" : "start")};
`;
const StyledDescription = styled.p``;

const confirmDeleteMessage = "Are you sure you want to delete the event?";

export default function EventDetail({ event }) {
  const { day, month, year, time } = getDate(event.startDateTime);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(confirmDeleteMessage)) {
      return;
    }
    await deleteEvent(event._id);
    router.push("/");
  }

  return (
    <StyledContainer>
      <StyledHeaderImage
        src={event.imageUrl}
        alt={event.title}
        width={260}
        height={260}
      />

      <StyledEventInfoContainer>
        <StyledTitle>{event.title}</StyledTitle>
        <StyledEventInfo $right>{event.category}</StyledEventInfo>
        <StyledEventInfo>{event.city}</StyledEventInfo>
        <StyledEventInfo
          $right
        >{`${day}. ${month} ${year}, ${time} Uhr`}</StyledEventInfo>
        <StyledEventInfo>{event.organizer}</StyledEventInfo>
      </StyledEventInfoContainer>
      <StyledDescription>{event.description}</StyledDescription>

      <button onClick={handleDelete}>Delete</button>
    </StyledContainer>
  );
}
