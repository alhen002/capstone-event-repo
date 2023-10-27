import { useSession } from "next-auth/react";
import EventList from "@/components/EventList";
import useSWR from "swr";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Button from "@/components/Button";
import { useRouter } from "next/router";
export default function MyEvents() {
  const {
    data: events,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/events/attending");
  const router = useRouter();

  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (isLoading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  return (
    <>
      <h2>Attending Events</h2>
      <Button onClick={() => router.back()}>Back</Button>
      {!events.length ? "No events yet" : <EventList events={events} />}
    </>
  );
}
