import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import getDate from "@/lib/getDate";
import Button from "./Button";
import { toggleAttending } from "@/lib/api";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/outline";

const StyledEventCard = styled.div`
  align-items: flex-start;
  min-height: 9rem;
  width: 288px;
  flex-shrink: 0;
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
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  color: var(--text-on-primary);
`;
const StyledEventCardDate = styled.p`
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  color: var(--subtle-text-on-primary);
`;

const StyledTitleContainer = styled.div``;

const StyledEventCardTitle = styled.h2`
  font-family: Inter;
  width: 185px;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  color: var(--text-on-primary);
`;
const StyledChevronRight = styled(ChevronRightIcon)`
  height: 44px;
  width: 44px;
  stroke: var(--background);
  position: absolute;
  right: 12px;
  bottom: 16px;
`;

const StyledStarIcon = styled(StarIcon)`
  height: 40px;
  width: 40px;
  ${(props) => {
    switch (props.$variant) {
      case "filled":
        return " stroke: var(--primary); fill: var(--primary); ";
      default:
        return "stroke: var(--primary); ";
    }
  }}
  position: absolute;
  top: 12px;
  right: 12px;
  transition: 1s;
  transition: 1s;
  z-index: 2;
`;

export default function EventCard({ event = {}, mutate }) {
  const { day, month } = getDate(event.startDateTime);
  const { data: session } = useSession();

  const isAttending = event?.attendingUsers?.some(
    (user) => user === session?.id
  );

  async function handleToggleAttending() {
    await toggleAttending(event._id);
    mutate();
  }

  return (
    <StyledEventCard>
      <StyledEventCardImageContainer>
        {session?.id && (
          <button onClick={handleToggleAttending}>
            {isAttending ? (
              <StyledStarIcon />
            ) : (
              <StyledStarIcon $variant={"filled"} />
            )}
          </button>
        )}

        <StyledEventCardImage
          src={event.imageUrl}
          alt={event.title.toLowerCase()}
          quality={50}
          fill={true}
        />
      </StyledEventCardImageContainer>
      <Link href={`/events/${event._id}`}>
        <StyledEventCardTextContainer>
          <StyledInfoContainer>
            <StyledEventCardCity>{event.city}</StyledEventCardCity>
            <StyledEventCardDate>{`${day}. ${month}`}</StyledEventCardDate>
          </StyledInfoContainer>
          <StyledEventCardTitle>{event.title}</StyledEventCardTitle>
          <StyledChevronRight />
        </StyledEventCardTextContainer>
      </Link>
    </StyledEventCard>
  );
}
