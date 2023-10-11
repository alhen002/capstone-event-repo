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

  if (isLoading)
    return (
      <>
        <Header />
        <Loading />
      </>
    );

  if (error)
    return (
      <>
        <Header />
        <Error>{error.message}</Error>
      </>
    );

  return (
    <>
      <Header />
      <StyledMain>{events && <EventList events={events} />}</StyledMain>
    </>
  );
}
