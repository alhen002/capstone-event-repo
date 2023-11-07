import EventCard from "./EventCard";
import Link from "next/link";
import styled from "styled-components";
import ChevronRight from "./icons/ChevronRight";

const StyledSection = styled.section`
  margin-inline: auto;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const HeadlineContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-inline: 2rem;
  flex-wrap: no-wrap;
  align-items: center;
`;

const StyledCategoryHeadline = styled.h2`
  color: var(--text-accent);
  font-size: 36px;
  font-weight: 600;
  padding-top: 18px;
  padding-bottom: 18px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
`;

export default function CategoryHighlight({ category, mutate }) {
  return (
    <>
      <StyledSection>
        <Link href={`/categories/${category.slug}`}>
          <HeadlineContainer>
            <StyledCategoryHeadline>{category.name}</StyledCategoryHeadline>
            <ChevronRight variant={"category"} />
          </HeadlineContainer>
        </Link>
        <CardContainer>
          {category.events.slice(0, 5).map((event) => (
            <EventCard key={event._id} event={event} mutate={mutate} />
          ))}
        </CardContainer>
      </StyledSection>
    </>
  );
}
