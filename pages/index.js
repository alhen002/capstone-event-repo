// lib imports
import useSWR from "swr";

// components
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import EventList from "@/components/EventList";
import Header from "@/components/Header";

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
    <div>
      <Header />
      <EventList events={events} />
    </div>
  );
}
