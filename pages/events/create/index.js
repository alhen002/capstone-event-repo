import Header from "@/components/Header";
import EventForm from "@/components/EventForm";
import { StyledMain } from "@/components/StyledMain";
import LinkButton from "@/components/LinkButton";

export default function Page() {
  return (
    <>
      <Header />
      <StyledMain>
        <LinkButton />
        <EventForm />
      </StyledMain>
    </>
  );
}
