import { useRouter } from "next/router";
import EventList from "@/components/EventList";
import Button from "@/components/Button";
import Heading from "@/components/ui/Heading";
import ChevronLeft from "@/components/ui/icons/ChevronLeft";
export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <>
      <Heading>
        <Button variant="none" onClick={() => router.back()}>
          <ChevronLeft variant="category" />
        </Button>
        Results for &apos;{q}&apos;:
      </Heading>
      <EventList searchQuery={q} />
    </>
  );
}
