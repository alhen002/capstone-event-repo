import styled from "styled-components";
import Image from "next/image";

const StyledArticle = styled.article`
  position: relative;
  padding-inline: 1rem;
  padding-block: 2rem;
  border: 1px solid black;
  min-height: 9rem;
  border-radius: 5px;
`;
const StyledImage = styled(Image)`
  z-index: -1;
`;

const StyledTitle = styled.h2`
  color: white;
  font-size: 1rem;
  position: absolute;
  left: 1rem;
  bottom: 0.5rem;
`;

const StyledCity = styled.span`
  font-size: 0.75rem;
`;

const StyledDate = styled.p`
  color: white;
  font-size: 0.75rem;
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
`;

export default function EventCard({ event }) {
  // computed from event prop
  const eventDate = new Date(event.start_date_time);
  const eventDay = eventDate.getDate();
  const eventMonth = eventDate.toLocaleDateString("default", {
    month: "short",
  });

  return (
    <StyledArticle>
      <StyledImage
        src={event.image_url}
        alt={event.title.toLowerCase()}
        fill={true}
      />
      <StyledTitle>
        {event.title}, <StyledCity>{event.city}</StyledCity>
      </StyledTitle>
      <StyledDate>{`${eventDay}. ${eventMonth}`}</StyledDate>
    </StyledArticle>
  );
}
