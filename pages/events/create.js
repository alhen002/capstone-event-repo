import EventForm from "@/components/EventForm";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import useSWR from "swr";
import { useRouter } from "next/router";
import LinkButton from "@/components/LinkButton";

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: events, isLoading, error } = useSWR("/api/users/me/events");
  if (status === "unauthenticated") {
    router.push("/login");
  }
  if (isLoading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  return <EventForm />;
}
