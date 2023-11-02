import styled from "styled-components";
import getDate from "../../lib/getDate";
import Image from "next/image";
import SubHeading from "../ui/Subheading";

const StyledContainer = styled.div`
  position: relative;
  padding-inline: 1rem;
  padding-block: 2rem;
  border: 1px solid #000000;
  min-height: 9rem;
  border-radius: 5px;
`;

const StyledImage = styled(Image)`
  z-index: -1;
  object-fit: cover;
`;
const StyledTitle = styled(SubHeading)`
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

export default function EventPreview({ event }) {
  const { day, month } = getDate(event?.startDateTime);

  return (
    <StyledContainer>
      {event.cover && (
        <StyledImage
          src={event?.cover?.url}
          alt={event?.title.toLowerCase()}
          fill={true}
          quality={30}
        />
      )}
      <StyledTitle>
        {event.title}, <StyledCity>{event.city}</StyledCity>
      </StyledTitle>
      <StyledDate>{`${day}. ${month}`}</StyledDate>
    </StyledContainer>
  );
}
