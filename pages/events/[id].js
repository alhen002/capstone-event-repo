import { useRouter } from "next/router";
import useSWR from "swr";

import Loading from "@/components/Loading";
import Error from "@/components/Error";
import EventDetail from "@/components/EventDetail";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { StyledMain } from "@/components/StyledMain";

export default function Event() {
  const router = useRouter();
  const { id } = router.query;

  const { data: event, isLoading, error } = useSWR(`/api/events/${id}`);

  return (
    <>
      <Header />
      <StyledMain>
        <Button href="/" color="green">
          Back
        </Button>
        {isLoading && <Loading />}
        {error && (
          <Error>{`${error.status} | ${error.statusText} | ${error.message}`}</Error>
        )}
        {event && <EventDetail />}
      </StyledMain>
    </>
  );
}
