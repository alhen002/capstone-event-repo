import styled from "styled-components";
import EventCard from "./EventCard";

import useSWR from "swr";
import Loading from "./Loading";
import Error from "./Error";

const StyledSection = styled.section`
  margin-inline: auto;
  max-width: 36rem;
  padding-inline: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function EventList({
  searchQuery = "",
  attending = false,
  owned = false,
  category = "",
}) {
  const SWRString =
    (attending && "/api/events/attending") ||
    (owned && "/api/users/me/events") ||
    (category && `/api/categories/${category}/events`) ||
    (searchQuery && `/api/search?events=${searchQuery}`);

  const { data: events, isLoading, error, mutate } = useSWR(SWRString);

  if (isLoading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <StyledSection>
      {!events?.length ? (
        <p>Sorry, no events found.</p>
      ) : (
        events?.map((event) => (
          <EventCard event={event} key={event._id} mutate={mutate} />
        ))
      )}
    </StyledSection>
  );
}
