import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import getDate from "@/lib/getDate";
import Button from "./Button";
import { toggleAttending } from "@/lib/api";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: var(--secondary-pressed);
  min-height: 9rem;
`;

const StyledEventCardImage = styled(Image)`
  z-index: -1;
  object-fit: cover;
`;

const StyledEventCardImageContainer = styled.div`
  border-radius: 20px 20px 0px 0px;
  display: relative;
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
          {/* <StyledEventCardImage
            src={event.imageUrl}
            alt={event.title.toLowerCase()}
            quality={50}
            fill={true}
          />{" "} */}
        </StyledEventCardImageContainer>
      </StyledEventCard>
    </>
  );
}
