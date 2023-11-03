import { useRouter } from "next/router";
import useSWR from "swr";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import EventDetail from "@/components/EventDetail";
import Button from "@/components/Button";

export default function Event() {
  const router = useRouter();
  const { id } = router.query;

  const { data: event, isLoading, error } = useSWR(`/api/events/${id}`);

  return (
    <>
      {isLoading && <Loading />}
      {error && (
        <Error>{`${error.status} | ${error.statusText} | ${error.message}`}</Error>
      )}
      {event && <EventDetail event={event} />}
    </>
  );
}
