import { useRouter } from "next/router";
import EventList from "@/components/EventList";
import Button from "@/components/Button";
import useSWR from "swr";
import Heading from "@/components/ui/Heading";
import ChevronLeft from "@/components/ui/icons/ChevronLeft";
export default function Category() {
  const router = useRouter();
  const { slug } = router.query;

  const { data: category } = useSWR(`/api/categories/${slug}`);

  return (
    <>
      <Heading>
        <Button variant="none" onClick={() => router.back()}>
          <ChevronLeft variant="category" />
        </Button>
        {category?.name}
      </Heading>
      <EventList category={slug} filterConfig={["city"]} />
    </>
  );
}
