import EventForm from "@/components/Form/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return <EventForm />;
}
