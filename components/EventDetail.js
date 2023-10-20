import styled from "styled-components";
import Image from "next/image";
import getDate from "@/lib/getDate";
import Map from "./Map";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { updateEvent } from "@/lib/api";
import { deleteEvent } from "@/lib/api";
import Button from "components/Button.js";
// ui styles

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block: 2rem;
  max-width: 36rem;
  margin-inline: auto;
`;

const StyledHeaderImage = styled(Image)`
  width: 100%;
`;
const StyledTitle = styled.p`
  font-size: 1rem;
`;

const StyledEventInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: baseline;
`;
const StyledEventInfo = styled.p`
  justify-self: ${(props) => (props.$right ? "end" : "start")};
`;

const StyledDescription = styled.p`
  font-size: 1rem;
  grid-column: 1 / -1;
`;

// form styles
const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: baseline;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  grid-column: ${(props) => (props.$full ? "1 / -1" : "")};
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: 1px solid #000000;
  border-radius: 5px;
`;

const StyledTextarea = styled.textarea`
  font-size: 1rem;
  border: 1px solid #000000;
  border-radius: 5px;
`;
const confirmDeleteMessage = "Are you sure you want to delete the event?";
export default function EventDetail({ event = {} }) {
  const router = useRouter();
  const { mutate } = useSWR(`/api/events/${event._id}`);
  // destructuring a formatted date of the event object
  const { day, month, year, dateString, time } = getDate(event.startDateTime);
  // toggle for Edit Mode
  const [isEditMode, setIsEditMode] = useState(false);
  // handle functions
  async function handleSubmit(jsEvent) {
    jsEvent.preventDefault();
    const formData = new FormData(jsEvent.target);
    const data = Object.fromEntries(formData);
    await updateEvent(event._id, data);
    setIsEditMode(false);
    mutate();
  }

  async function handleDelete() {
    if (!confirm(confirmDeleteMessage)) {
      return;
    }
    await deleteEvent(event._id);
    router.push("/");
  }

  return (
    <>
      <StyledContainer>
        <StyledHeaderImage
          src={event.imageUrl}
          alt={event.title}
          width={260}
          height={260}
        />
        {!isEditMode ? (
          <StyledEventInfoContainer>
            <StyledTitle>{event.title}</StyledTitle>
            <StyledEventInfo $right>{event.category}</StyledEventInfo>
            <StyledEventInfo>{event.city}</StyledEventInfo>
            <StyledEventInfo
              $right
            >{`${day}. ${month} ${year}, ${time}`}</StyledEventInfo>
            <StyledEventInfo>{event.organizer}</StyledEventInfo>
            <StyledDescription>{event.description}</StyledDescription>
          </StyledEventInfoContainer>
        ) : (
          <StyledForm onSubmit={handleSubmit}>
            <StyledLabel htmlFor="title">
              title
              <StyledInput id="title" defaultValue={event.title} name="title" />
            </StyledLabel>
            <StyledLabel htmlFor="category">
              category
              <StyledInput
                id="category"
                defaultValue={event.category}
                name="category"
              />
            </StyledLabel>
            <StyledLabel htmlFor="city">
              city
              <StyledInput id="city" defaultValue={event.city} name="city" />
            </StyledLabel>
            <StyledLabel htmlFor="date">
              date
              <StyledInput
                id="date"
                type="datetime-local"
                defaultValue={dateString}
                name="startDateTime"
              />
            </StyledLabel>
            <StyledLabel htmlFor="organizer">
              organizer
              <StyledInput
                id="organizer"
                defaultValue={event.organizer}
                name="organizer"
              />
            </StyledLabel>
            <StyledLabel $full htmlFor="description">
              description
              <StyledTextarea
                id="description"
                name="description"
                defaultValue={event.description}
              />
            </StyledLabel>
            <Button color={"green"}>Save</Button>
          </StyledForm>
        )}
        {event.coordinates && (
          <Map posLng={event.coordinates.lng} posLat={event.coordinates.lat} />
        )}
      </StyledContainer>
      <StyledContainer>
        <Button
          color={isEditMode ? "" : "green"}
          onClick={() =>
            setIsEditMode((currentIsEditMode) => !currentIsEditMode)
          }
        >
          {isEditMode ? "Cancel" : "Edit"}
        </Button>
        <Button color={"rose"} onClick={handleDelete}>
          Delete
        </Button>
      </StyledContainer>
    </>
  );
}
