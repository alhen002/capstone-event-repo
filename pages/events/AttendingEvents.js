import { useSession } from "next-auth/react";
import EventList from "@/components/EventList";
import { useRouter } from "next/router";
import Button from "@/components/Button";

export default function AttendingEvents() {
  const router = useRouter();

  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <>
      <h2>Attending Events</h2>
      <Button onClick={() => router.back()}>Back</Button>
      <EventList attending />
    </>
  );
}
