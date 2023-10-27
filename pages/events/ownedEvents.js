import EventList from "@/components/EventList";
import { useSession } from "next-auth/react";

import Button from "@/components/Button";
import { useRouter } from "next/router";

export default function OwnedEvents() {
  const router = useRouter();

  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <>
      <h1>Here are all your owned Events</h1>
      <Button onClick={() => router.back()}>Back</Button>
      <EventList owned filterConfig={["city", "category"]} />
    </>
  );
}
