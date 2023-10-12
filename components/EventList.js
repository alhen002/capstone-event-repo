import styled from "styled-components";
import EventCard from "./EventCard";
import LinkButton from "./LinkButton";

export const StyledList = styled.ul`
  margin-inline: auto;
  list-style-type: none;
  max-width: 36rem;
  padding-inline: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function EventList({ events }) {
  return (
    <StyledList>
      <LinkButton url={"/events/create"}>Add new event</LinkButton>
      {events.map((event) => (
        <EventCard event={event} key={event._id} />
      ))}
    </StyledList>
  );
}
