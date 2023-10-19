import styled from "styled-components";
import EventCard from "./EventCard";
import LinkButton from "./LinkButton";

const StyledSection = styled.section`
  margin-inline: auto;
  max-width: 36rem;
  padding-inline: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function EventList({ events }) {
  return (
    <StyledSection>
      {events.map((event) => (
        <EventCard event={event} key={event._id} />
      ))}
    </StyledSection>
  );
}
