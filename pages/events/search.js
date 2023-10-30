import { useRouter } from "next/router";
import EventList from "@/components/EventList";
import Button from "@/components/Button";
export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <>
      <Button onClick={() => router.back()}>Back</Button>
      <h1>Your Search for &apos;{q}&apos; revealed the following results:</h1>
      <EventList searchQuery={q} />
    </>
  );
}
