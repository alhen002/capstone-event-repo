import styled from "styled-components";
import getDate from "../../lib/getDate";
import Image from "next/image";

const StyledEventCard = styled.div`
  align-items: flex-start;
  min-height: 9rem;
  width: 288px;
  flex-shrink: 0;
  margin: 1rem;
`;

const StyledEventCardImageContainer = styled.div`
  position: relative;
  min-height: 10.25rem;
`;
const StyledEventCardImage = styled(Image)`
  object-fit: cover;
  border-radius: 20px 20px 0px 0px;
  z-index: 1;
  filter: grayscale(var(--value, 20%));
`;

const StyledEventCardTextContainer = styled.div`
  border-radius: 0px 0px 20px 20px;
  position: relative;
  min-height: 7.75rem;
  padding: 16px 12px 16px 16px;
  background: var(--primary);
`;

const StyledInfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;
const StyledEventCardCity = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  color: var(--text-on-primary);
`;
const StyledEventCardDate = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  color: var(--subtle-text-on-primary);
`;

const StyledEventCardTitle = styled.h2`
  width: 185px;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  color: var(--text-on-primary);
`;

export default function EventPreview({ event }) {
  const { day, month } = getDate(event?.startDateTime);

  return (
    <StyledEventCard>
      <StyledEventCardImageContainer>
        <StyledEventCardImage
          src={event?.cover?.url}
          alt={event?.title?.toLowerCase()}
          quality={50}
          fill={true}
        />
      </StyledEventCardImageContainer>
      <StyledEventCardTextContainer>
        <StyledInfoContainer>
          <StyledEventCardCity>{event.city}</StyledEventCardCity>
          <StyledEventCardDate>{`${day}. ${month}`}</StyledEventCardDate>
        </StyledInfoContainer>
        <StyledEventCardTitle>{event.title}</StyledEventCardTitle>
      </StyledEventCardTextContainer>
    </StyledEventCard>
  );
}
