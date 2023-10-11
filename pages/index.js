import useSWR from "swr";
import styled from "styled-components";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import EventList from "@/components/EventList";
import Header from "@/components/Header";

const StyledMain = styled.main`
  height: 100vh;
  padding-block: 3rem;
`;

export default function HomePage() {
  const { data: events, isLoading, error } = useSWR(`/api/events`);

  return (
    <>
      <Header />
      <StyledMain>
        {events && <EventList events={events} />}
        {isLoading && <Loading />}
        {error && <Error>{error.message}</Error>}
      </StyledMain>
    </>
  );
}
