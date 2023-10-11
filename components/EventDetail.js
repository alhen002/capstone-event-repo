import styled from "styled-components";
import Image from "next/image";

const StyledContainer = styled.div``;
const StyledHeaderImage = styled(Image)``;
const StyledTitle = styled.h2``;
const StyledEventInfo = styled.p``;
const StyledDescription = styled.p``;

export default function EventDetail({ event }) {
  return (
    <StyledContainer>
      <StyledHeaderImage
        src={event.imageUrl}
        alt={event.title}
        width={260}
        height={260}
      />
      <StyledTitle>{event.title}</StyledTitle>
      <StyledEventInfo>
        {`${event.category} - 
        ${event.organizer} -
        ${event.startDateTime} -
        ${event.endDateTime} -
        ${event.organizer}`}
      </StyledEventInfo>
      <StyledDescription>{event.description}</StyledDescription>
    </StyledContainer>
  );
}
