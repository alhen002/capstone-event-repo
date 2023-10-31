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
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/outline";

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
  object-fit: cover;
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

// NEW CARD

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
const StyledEventCardCity = styled.span`
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

const StyledPlusCircle = styled(StarIcon)`
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

const StyledCheckCircle = styled(CheckCircleIcon)`
  height: 44px;
  width: 44px;
  position: absolute;
  fill: var(--primary);
  top: 12px;
  right: 12px;
  transition: 1s;
  z-index: 2;
  backdrop-filter: blur(10px);
  border-radius: 50%;
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
    <>
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
        <StyledDate>{`${day}. ${month}`}</StyledDate>
      </StyledLink>{" "}
      {session?.id && (
        <Button variant={"secondary"} onClick={handleToggleAttending}>
          {isAttending ? "Won't attend" : "Attend"}
        </Button>
      )}
      <StyledEventCard>
        <StyledEventCardImageContainer>
          {isAttending ? (
            <StyledPlusCircle />
          ) : (
            <StyledPlusCircle $variant={"filled"} />
          )}
          <StyledEventCardImage
            src={event.imageUrl}
            alt={event.title.toLowerCase()}
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
          <StyledChevronRight />
        </StyledEventCardTextContainer>
      </StyledEventCard>
    </>
  );
}
