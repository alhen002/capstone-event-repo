import { useRouter } from "next/router";
import useSWR from "swr";
import EventList from "@/components/EventList";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import Button from "@/components/Button";
export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const { data: events, error, isLoading } = useSWR(`/api/search?events=${q}`);

  if (isLoading) return <Loading />;
  if (error) return <Error>{error.message}</Error>;

  if (!events.length)
    return (
      <>
        {" "}
        <Button onClick={() => router.back()}>Back</Button>
        <p>Sorry, no events found.</p>
      </>
    );
  return (
    <>
      <Button onClick={() => router.back()}>Back</Button>
      <h1>Your Search for &apos;{q}&apos; revealed the following results:</h1>
      <EventList events={events} />
    </>
  );
}
