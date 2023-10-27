import { useRouter } from "next/router";
import EventList from "@/components/EventList";
import Button from "@/components/Button";
import useSWR from "swr";
export default function Category() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: category } = useSWR(`/api/categories/${slug}`);

  return (
    <>
      <h1>{category?.name}</h1>
      <Button onClick={() => router.back()}>Back</Button>
      <EventList category={slug} />
    </>
  );
}
