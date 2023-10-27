import EventList from "@/components/EventList";
import { useSession } from "next-auth/react";

import Button from "@/components/Button";
import { useRouter } from "next/router";

export default function OwnedEvents() {
  const router = useRouter();

  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <>
      <h2>Owned Events</h2>
      <Button onClick={() => router.back()}>Back</Button>
      <EventList owned />
    </>
  );
}
