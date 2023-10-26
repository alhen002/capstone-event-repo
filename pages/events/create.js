import EventForm from "@/components/EventForm";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import useSWR from "swr";

export default function Page() {
  const { data: session, status } = useSession();
  const { data: events, isLoading, error } = useSWR("/api/users/me/events");
  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  if (isLoading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  return <EventForm />;
}
