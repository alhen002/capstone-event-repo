import styled from "styled-components";
import Image from "next/image";
import getDate from "@/lib/getDate";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
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

export default function EventDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { mutate, data: event } = useSWR(`/api/events/${id}`);

  // destructuring a formatted date of the event object
  const { day, month, year, time } = getDate(event?.startDateTime);

  // controlled input fields
  const [title, setTitle] = useState();
  const [city, setCity] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState();
  const [organizer, setOrganizer] = useState();
  const [description, setDescription] = useState();

  // toggle for Edit Mode
  const [isEditMode, setIsEditMode] = useState(false);

  // set input fields to the current event data
  useEffect(() => {
    setTitle(event.title);
    setCity(event.city);
    setCategory(event.category);
    setDate(event.startDateTime);
    setOrganizer(event.organizer);
    setDescription(event.description);
  }, [event]);

  async function handleSubmit(jsEvent) {
    jsEvent.preventDefault();

    const newEvent = {
      ...event,
      title,
      city,
      category,
      startDateTime: date,
      organizer,
      description,
    };

    const response = await fetch(`/api/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(newEvent),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.message);
    }

    setIsEditMode(false);
    mutate();
  }

  if (event)
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
                <input id="title"
                  value={title}
                  onChange={(jsEvent) => setTitle(jsEvent.target.value)}
                />
              </StyledTitle>
            ) : (
              <StyledTitle>{event.title}</StyledTitle>
            )}
            {isEditMode ? (
              <StyledEventInfo $right>
                <label htmlFor="category">Category</label>
                <input id="category"
                  value={category}
                  onChange={(jsEvent) => setCategory(jsEvent.target.value)}
                />
              </StyledEventInfo>
            ) : (
              <StyledEventInfo $right>{event.category}</StyledEventInfo>
            )}

            {isEditMode ? (
              <StyledEventInfo>
                <label htmlFor="city">City</label>
                <input id="city"
                  value={city}
                  onChange={(jsEvent) => setCity(jsEvent.target.value)}
                />
              </StyledEventInfo>
            ) : (
              <StyledEventInfo>{event.city}</StyledEventInfo>
            )}

            {isEditMode ? (
              <StyledEventInfo $right>
                <label htmlFor="date">Date</label>
                <input id="date"
                  type="datetime-local"
                  value={date}
                  onChange={(jsEvent) => setDate(jsEvent.target.value)}
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
                <input id="organizer"
                  value={organizer}
                  onChange={(jsEvent) => setOrganizer(jsEvent.target.value)}
                />{" "}
              </StyledEventInfo>
            ) : (
              <StyledEventInfo>{event.organizer}</StyledEventInfo>
            )}
          </StyledEventInfoContainer>
          {isEditMode ? (
            <StyledDescription>
              <label htmlFor="description">Description</label>
              <textarea id="description"
                value={description}
                rows="5"
                cols="48"
                onChange={(jsEvent) => setDescription(jsEvent.target.value)}
              />
            </StyledDescription>
          ) : (
            <StyledDescription>{event.description}</StyledDescription>
          )}
        </StyledContainer>
        <button
          onClick={() =>
            setIsEditMode((currentIsEditMode) => !currentIsEditMode)
          }
        >
          {isEditMode ? "Cancel" : "Edit"}
        </button>
        {isEditMode && <button onClick={handleSubmit}>Save</button>}
      </>
    );
}
