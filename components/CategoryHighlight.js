import EventCard from "./EventCard";
import LinkButton from "./LinkButton";
import styled from "styled-components";

const StyledSection = styled.section`
  margin-inline: auto;
  list-style-type: none;
  max-width: 36rem;
  padding-inline: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function CategoryHighlight({ category }) {
  return (
    <>
      <StyledSection>
        <h2>{category.name}</h2>
        {category.events.slice(0, 3).map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
        <LinkButton href={`/categories/${category.slug}`}>Show more</LinkButton>
      </StyledSection>
    </>
  );
}
