import { useSession } from "next-auth/react";
import EventList from "@/components/EventList";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Heading from "@/components/ui/Heading";
import ChevronLeft from "@/components/icons/ChevronLeft";

export default function AttendingEvents() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <>
      <Heading>
        <Button variant="none" onClick={() => router.back()}>
          <ChevronLeft variant="category" />
        </Button>
        Attending Events
      </Heading>
      <EventList attending filterConfig={["city", "category"]} />
    </>
  );
}
