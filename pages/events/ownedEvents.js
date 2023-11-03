import EventList from "@/components/EventList";
import { useSession } from "next-auth/react";

import Button from "@/components/Button";
import { useRouter } from "next/router";
import Heading from "@/components/ui/Heading";
import ChevronLeft from "@/components/ui/Icons/ChevronLeft";

export default function OwnedEvents() {
  const router = useRouter();

  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <>
      <Heading>
        <Button variant="none" onClick={() => router.back()}>
          <ChevronLeft variant="category" />
        </Button>
        Your events
      </Heading>
      <EventList owned filterConfig={["city", "category"]} />
    </>
  );
}
