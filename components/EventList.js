import styled from "styled-components";
import EventCard from "./EventCard";

const StyledList = styled.ul`
  margin: 0 auto;
  list-style-type: none;
  max-width: 80ch;
  padding-inline 1 rem;
  padding-block: 3rem;
`;

export default function EventList({ events }) {
  return (
    <StyledList>
      {events.map((event) => (
        <li key={event._id}>
          <EventCard event={event} />
        </li>
      ))}
    </StyledList>
  );
}
