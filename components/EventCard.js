import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const StyledLink = styled(Link)`
  position: relative;
  padding-inline: 1rem;
  padding-block: 2rem;
  border: 1px solid #000000;
  min-height: 9rem;
  border-radius: 5px;
`;
const StyledImage = styled(Image)`
  z-index: -1;
`;

const StyledTitle = styled.h2`
  color: #ffffff;
  font-size: 1rem;
  position: absolute;
  left: 1rem;
  bottom: 0.5rem;
`;

const StyledCity = styled.span`
  font-size: 0.75rem;
`;

const StyledDate = styled.p`
  color: #ffffff;
  font-size: 0.75rem;
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
`;

export default function EventCard({ event }) {
  // computed from event prop
  const eventDate = new Date(event.startDateTime);
  const eventDay = eventDate.getDate();
  const eventMonth = eventDate.toLocaleDateString("default", {
    month: "short",
  });

  return (
    <StyledLink href={`/events/${event._id}`}>
      <StyledImage
        src={event.imageUrl}
        alt={event.title.toLowerCase()}
        fill={true}
        quality={50}
      />
      <StyledTitle>
        {event.title}, <StyledCity>{event.city}</StyledCity>
      </StyledTitle>
      <StyledDate>{`${eventDay}. ${eventMonth}`}</StyledDate>
    </StyledLink>
  );
}
