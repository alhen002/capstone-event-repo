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
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { toggleAttending } from "@/lib/api";
import AttendingUsersPreview from "./AttendingUsers";
import toast from "react-hot-toast";

const AddressAutofill = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
  { ssr: false }
);
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

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

const StyledSelect = styled.select`
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
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate } = useSWR(`/api/events/${event._id}`);
  // true oder false
  const isOwner = session?.id === event.organizer._id;
  const isAttending = event.attendingUsers.some(
    (user) => user._id === session?.id
  );

  const {
    day: startDay,
    month: startMonth,
    year: startYear,
    dateString: startDateString,
    time: startTime,
  } = getDate(event.startDateTime);
  const {
    day: endDay,
    month: endMonth,
    year: endYear,
    dateString: endDateString,
    time: endTime,
  } = getDate(event.endDateTime);
  // toggle for Edit Mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [coordinates, setCoordinates] = useState(event.coordinates);

  // handle functions
  async function handleSubmit(jsEvent) {
    jsEvent.preventDefault();
    const formData = new FormData(jsEvent.target);
    const data = Object.fromEntries(formData);
    const newEvent = {
      title: data.title,
      city: data.city,
      address: data["address address-search"],
      coordinates: coordinates,
      postalCode: data.postalCode,
      country: data.country,
      category: data.category,
      description: data.description,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
      organizer: data.organizer,
    };
    await updateEvent(event._id, newEvent);
    setIsEditMode(false);
    toast.success("You've successfully edited your event.");
    mutate();
  }

  async function handleDelete() {
    if (!confirm(confirmDeleteMessage)) {
      return;
    }
    await deleteEvent(event._id);
    toast.success("You've successfully deleted your event.");
    router.push("/");
  }

  async function handleToggleAttending() {
    await toggleAttending(event._id);
    mutate();
  }

  const handleRetrievedAutofill = (response) => {
    const feature = response.features[0];
    const object = {
      lng: feature.geometry.coordinates[0],
      lat: feature.geometry.coordinates[1],
    };
    setCoordinates(object);
  };

  return (
    <>
      <StyledContainer>
        <StyledHeaderImage
          src={event?.cover?.url}
          alt={event.title}
          width={260}
          height={260}
        />
        {!isEditMode ? (
          <StyledEventInfoContainer>
            <StyledTitle>{event.title}</StyledTitle>
            <StyledEventInfo $right>{event.category}</StyledEventInfo>
            <StyledEventInfo>{event.address}</StyledEventInfo>
            <StyledEventInfo
              $right
            >{`Start: ${startDay}. ${startMonth} ${startYear}, ${startTime}`}</StyledEventInfo>
            <StyledEventInfo>{event.city}</StyledEventInfo>
            <StyledEventInfo
              $right
            >{`End: ${endDay}. ${endMonth} ${endYear}, ${endTime}`}</StyledEventInfo>

            <StyledEventInfo>{event.organizer.name}</StyledEventInfo>
            <StyledDescription>{event.description}</StyledDescription>
            {event.attendingUsers.length > 0 && (
              <AttendingUsersPreview attendingUsers={event.attendingUsers} />
            )}
          </StyledEventInfoContainer>
        ) : (
          <StyledForm onSubmit={handleSubmit}>
            <StyledLabel htmlFor="title">
              title
              <StyledInput id="title" defaultValue={event.title} name="title" />
            </StyledLabel>
            <StyledLabel htmlFor="category">
              category
              <StyledSelect
                id="category"
                defaultValue={event.category}
                name="category"
              >
                <option value=""> --Please pick a category-- </option>
                <option value="Nightlife & Clubs">Nightlife & Clubs</option>
                <option value="Culture & Arts">Culture & Arts</option>
                <option value="Activities & Games">Activities & Games</option>
                <option value="Live Shows"> Live Shows</option>
                <option value="Community Meet-up">Community Meet-up</option>
              </StyledSelect>
            </StyledLabel>
            <StyledLabel htmlFor="address">
              Address
              <AddressAutofill
                accessToken={mapboxAccessToken}
                onRetrieve={handleRetrievedAutofill}
              >
                <StyledInput
                  id="address"
                  defaultValue={event.address}
                  name="address"
                />
              </AddressAutofill>
            </StyledLabel>
            <StyledLabel htmlFor="city">
              city
              <StyledInput
                id="city"
                defaultValue={event.city}
                name="city"
                autoComplete="address-level2"
              />
            </StyledLabel>
            <StyledLabel htmlFor="postalCode">
              PLZ
              <StyledInput
                id="postalCode"
                name="postalCode"
                defaultValue={event.postalCode}
                autoComplete="postal-code"
              />
            </StyledLabel>
            <StyledLabel htmlFor="country">
              city
              <StyledInput
                id="country"
                defaultValue={event.country}
                name="country"
                autoComplete="country-name"
              />
            </StyledLabel>
            <StyledLabel htmlFor="date">
              start
              <StyledInput
                id="date"
                type="datetime-local"
                defaultValue={startDateString}
                name="startDateTime"
              />
            </StyledLabel>
            <StyledLabel htmlFor="date">
              end
              <StyledInput
                id="date"
                type="datetime-local"
                defaultValue={endDateString}
                name="endDateTime"
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
        {isOwner && (
          <>
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
          </>
        )}
        {session?.id && (
          <Button onClick={handleToggleAttending}>
            {isAttending ? "Won't attend" : "Attend"}
          </Button>
        )}
      </StyledContainer>
    </>
  );
}
