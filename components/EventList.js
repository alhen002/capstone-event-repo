import styled from "styled-components";
import EventCard from "./EventCard";
import FilterBar from "./FilterBar";
import useSWR from "swr";
import Loading from "./Loading";
import Error from "./Error";
import useFilters from "@/hooks/useFilters";

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
  filterConfig = [],
}) {
  const { filters, reset, onChange } = useFilters({ city: "", category: "" });

  const SWRString =
    (attending && "/api/users/me/attending") ||
    (owned && "/api/users/me/events") ||
    (category && `/api/categories/${category}/events`) ||
    (searchQuery && `/api/search?events=${searchQuery}`);

  function getURLParams(url, filter = {}) {
    const params = new URLSearchParams();
    filter.category && params.append("category", filter.category);
    filter.city && params.append("city", filter.city);
    return `${url}${params.size ? `?${params}` : ""}`;
  }

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
        <FilterBar
          key={index}
          reset={reset}
          onChange={onChange}
          filters={filters}
          type={filter}
        />
      ))}
      {!events?.length ? (
        <p>Sorry, no events found.</p>
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
