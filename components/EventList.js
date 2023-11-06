import styled from "styled-components";
import EventCard from "./EventCard";
import Filters from "./Filters";
import useSWR from "swr";
import Loading from "./Loading";
import Error from "./Error";
import useFilters from "@/hooks/useFilters";
import ResetButton from "./ResetButton";
import { getURLParams } from "@/lib/utils";
import Paragraph from "./ui/Paragraph";
const StyledSection = styled.section`
  margin-inline: auto;
  max-width: 36rem;
  padding-inline: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export default function EventList({
  searchQuery = "",
  attending = false,
  owned = false,
  category = "",
  filterConfig = [],
}) {
  const { filters, reset, onChange } = useFilters({ city: "", category: "" });

  const SWRString =
    (attending && "/api/users/me/attending") ||
    (owned && "/api/users/me/events") ||
    (category && `/api/categories/${category}/events`) ||
    (searchQuery && `/api/search?events=${searchQuery}`);

  const {
    data: events,
    isLoading,
    error,
    mutate,
  } = useSWR(getURLParams(SWRString, filters));

  if (isLoading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      {filterConfig?.map((filter, index) => (
        <Filters
          key={index}
          onChange={onChange}
          filters={filters}
          type={filter}
          reset={reset}
        />
      ))}
      {!events?.length ? (
        <StyledSection>
          <Paragraph color="accent">Sorry, no events found.</Paragraph>
        </StyledSection>
      ) : (
        <>
          <StyledSection>
            {events?.map((event) => (
              <EventCard event={event} key={event._id} mutate={mutate} />
            ))}
          </StyledSection>
        </>
      )}
    </>
  );
}
