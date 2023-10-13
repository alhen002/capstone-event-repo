import styled from "styled-components";
import Image from "next/image";
import getDate from "@/lib/getDate";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { updateEvent } from "@/lib/api";

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

const StyledTitle = styled.p``;
const StyledEventInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: baseline;
`;

const StyledEventInfo = styled.p`
  justify-self: ${(props) => (props.$right ? "end" : "start")};
`;

const StyledDescription = styled.p``;

const initialState = {
  title: "",
  city: "",
  category: "",
  startDateTime: "",
  organizer: "",
  description: "",
};

export default function EventDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { mutate, data: event } = useSWR(`/api/events/${id}`);

  // destructuring a formatted date of the event object
  const { day, month, year, time } = getDate(event?.startDateTime);

  const [formData, setFormData] = useState(initialState);

  // toggle for Edit Mode
  const [isEditMode, setIsEditMode] = useState(false);

  // set input fields to the current event data
  useEffect(() => {
    setFormData({
      title: event.title,
      city: event.city,
      category: event.category,
      startDateTime: event.startDateTime,
      organizer: event.organizer,
      description: event.description,
    });
  }, [event]);

  // handle functions
  async function handleSubmit(jsEvent) {
    jsEvent.preventDefault();
    await updateEvent(id, formData);
    setIsEditMode(false);
    mutate();
  }
  function handleChange(jsEvent, target) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [target]: jsEvent.target.value,
      };
    });
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
        <StyledEventInfoContainer>
          {isEditMode ? (
            <StyledTitle>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                value={formData.title}
                onChange={(jsEvent) => handleChange(jsEvent, "title")}
              />
            </StyledTitle>
          ) : (
            <StyledTitle>{event.title}</StyledTitle>
          )}
          {isEditMode ? (
            <StyledEventInfo $right>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                value={formData.category}
                onChange={(jsEvent) => handleChange(jsEvent, "category")}
              />
            </StyledEventInfo>
          ) : (
            <StyledEventInfo $right>{event.category}</StyledEventInfo>
          )}

          {isEditMode ? (
            <StyledEventInfo>
              <label htmlFor="city">City</label>
              <input
                id="city"
                value={formData.city}
                onChange={(jsEvent) => handleChange(jsEvent, "city")}
              />
            </StyledEventInfo>
          ) : (
            <StyledEventInfo>{event.city}</StyledEventInfo>
          )}

          {isEditMode ? (
            <StyledEventInfo $right>
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="datetime-local"
                value={formData.date}
                onChange={(jsEvent) => handleChange(jsEvent, "date")}
              />
            </StyledEventInfo>
          ) : (
            <StyledEventInfo
              $right
            >{`${day}. ${month} ${year}, ${time} Uhr`}</StyledEventInfo>
          )}

          {isEditMode ? (
            <StyledEventInfo>
              {" "}
              <label htmlFor="organizer">Organizer</label>
              <input
                id="organizer"
                value={formData.organizer}
                onChange={(jsEvent) => handleChange(jsEvent, "organizer")}
              />{" "}
            </StyledEventInfo>
          ) : (
            <StyledEventInfo>{event.organizer}</StyledEventInfo>
          )}
        </StyledEventInfoContainer>
        {isEditMode ? (
          <StyledDescription>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              rows="5"
              cols="48"
              onChange={(jsEvent) => handleChange(jsEvent, "description")}
            />
          </StyledDescription>
        ) : (
          <StyledDescription>{event.description}</StyledDescription>
        )}
      </StyledContainer>
      <button
        onClick={() => setIsEditMode((currentIsEditMode) => !currentIsEditMode)}
      >
        {isEditMode ? "Cancel" : "Edit"}
      </button>
      {isEditMode && <button onClick={handleSubmit}>Save</button>}
    </>
  );
}
