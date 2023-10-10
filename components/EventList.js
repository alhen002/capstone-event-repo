import styled from "styled-components";
import EventCard from "./EventCard";

export default function EventList({ events }) {
  return (
    <ul>
      {events.map((event) => (
        <li key={event._id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
}
