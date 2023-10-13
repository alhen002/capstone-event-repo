import styled from "styled-components";
import Image from "next/image";
import getDate from "@/lib/getDate";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { updateEvent } from "@/lib/api";

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

export default function EventDetail({ event = {} }) {
  const { mutate } = useSWR(`/api/events/${event._id}`);

  // destructuring a formatted date of the event object
  const { day, month, year, formattedDate, time } = getDate(
    event.startDateTime
  );

  // toggle for Edit Mode
  const [isEditMode, setIsEditMode] = useState(false);

  // handle functions
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    await updateEvent(event._id, data);
    setIsEditMode(false);
    mutate();
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
                defaultValue={formattedDate}
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
            <button>Save</button>
          </StyledForm>
        )}
      </StyledContainer>

      <StyledContainer>
        <button
          onClick={() =>
            setIsEditMode((currentIsEditMode) => !currentIsEditMode)
          }
        >
          {isEditMode ? "Cancel" : "Edit"}
        </button>
      </StyledContainer>
    </>
  );
}
