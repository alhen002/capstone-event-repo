import styled from "styled-components";
import Image from "next/image";

export default function EventCard({ event }) {
  const date = new Date(event.start_date_time);
  console.log(date);
  return (
    <article>
      <Image
        src={event.image_url}
        alt={event.title.toLowerCase()}
        width={360}
        height={24}
      />
      <h2>
        {event.title}
        <span>{event.city}</span>
      </h2>
      <date>{event.start_date_time}</date>
    </article>
  );
}

//   "start_date_time": "2022-09-10T14:00:00",
