// lib imports
import useSWR from "swr";

// components
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import EventList from "@/components/EventList";
import Header from "@/components/Header";


const events = [
  {
    title: "Music Festival",
    city: "New York",
    category: "Music",
    description: "Join us for a weekend of live music performances!",
    image_url:
      "https://images.unsplash.com/photo-1555086156-e6c7353d283f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    start_date_time: "2022-09-10T14:00:00",
    end_date_time: "2022-09-10T22:00:00",
    organizer: "Music Events Inc.",
  },
];

const error = null;
const isLoading = false;

export default function HomePage() {
  // const {data: events, isLoading, error} = useSWR(`URL`)

  if (isLoading)
    return (
      <>
        <Header />
        <Loading />
      </>
    );

  if (error)
    return (
      <>
        <Header />
        <Error>{error.message}</Error>
      </>
    );

  return (
    <div>
      <Header />
      <EventList events={events} />
    </div>
  );
}
