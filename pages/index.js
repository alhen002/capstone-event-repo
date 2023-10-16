import useSWR from "swr";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import EventList from "@/components/EventList";

export default function HomePage() {
  const { data: events, isLoading, error } = useSWR(`/api/events`);
  return (
    <>
      {isLoading && <Loading />}
      {error && (
        <Error>{`${error.status} | ${error.statusText} | ${error.message}`}</Error>
      )}
      {events && <EventList events={events} />}
    </>
  );
}
