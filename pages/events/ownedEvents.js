import { useSession } from "next-auth/react";
import EventList from "@/components/EventList";
import useSWR from "swr";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Button from "@/components/Button";
import { useRouter } from "next/router";
export default function MyEvents() {
  const { data: events, isLoading, error } = useSWR("/api/users/me/events");
  const router = useRouter();
  if (isLoading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <h2>My Events</h2>
      <Button onClick={() => router.back()}>Back</Button>
      {!events.length ? "No events yet" : <EventList events={events} />}
    </>
  );
}
