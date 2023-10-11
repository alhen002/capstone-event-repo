import useSWR from "swr";
import styled from "styled-components";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import EventList from "@/components/EventList";
import Header from "@/components/Header";
import { StyledMain } from "@/components/StyledMain";

export default function HomePage() {
  const { data: events, isLoading, error } = useSWR(`/api/events`);
  return (
    <>
      <Header />
      <StyledMain>
        {isLoading && <Loading />}
        {error && (
          <Error>{`${error.status} | ${error.statusText} | ${error.message}`}</Error>
        )}
        {events && <EventList events={events} />}
      </StyledMain>
    </>
  );
}
