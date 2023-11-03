import { useRouter } from "next/router";
import EventList from "@/components/EventList";
import Button from "@/components/Button";
import Heading from "@/components/ui/Heading";
export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <>
      <Button onClick={() => router.back()}>Back</Button>
      <Heading>
        Your Search for &apos;{q}&apos; revealed the following results:
      </Heading>
      <EventList searchQuery={q} />
    </>
  );
}
