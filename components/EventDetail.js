import styled, { css } from "styled-components";
import Image from "next/image";

import Map from "./Map";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { updateEvent } from "@/lib/api";
import { deleteEvent } from "@/lib/api";
import getDate from "@/lib/getDate";
import { toggleAttending } from "@/lib/api";
import Button from "components/Button.js";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import AttendingUsersPreview from "./AttendingUsers";
import toast from "react-hot-toast";
import SubHeading from "./ui/SubHeading";
import Paragraph from "./ui/Paragraph";
import Star from "./icons/StarIcon";
import Label from "./ui/Label";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";

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
  background-color: var(--primary);
  border-radius: 0.75rem;
  overflow: hidden;
  margin: 1rem;
`;
const StyledImageContainer = styled.div`
  max-width: 36rem;
  height: 14rem;
  position: relative;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
  z-index: 2;
`;
const StyledThirdHeading = styled.h3`
  color: var(--subtle-text-on-primary);
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-style: normal;
  margin-bottom: 0.25rem;
  font-weight: 500;
  line-height: normal;
`;

const StyledHeaderImage = styled(Image)`
  object-fit: cover;
  z-index: -1;
`;

const StyledContentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 0.75rem;
  justify-content: space-between;
  ${(props) =>
    props.$right &&
    css`
      justify-content: flex-end;
      column-gap: 0.25rem;
    `}
  width: 100%;
  padding-inline: 0.5rem;
  margin-bottom: 1.5rem;
`;
const StyledContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-inline: 0.5rem;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

// form styles
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--primary);
  border-radius: 0.75rem;
  overflow: hidden;
`;

const StyledLabel = styled.label`
  color: var(--subtle-text-on-primary);
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-style: normal;
  margin-bottom: 0.25rem;
  font-weight: 500;
  line-height: normal;
  grid-column: ${(props) => (props.$full ? "1 / -1" : "")};
`;
const StyledFieldSet = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
  gap: 2rem;
  justify-content: space-between;
  ${(props) =>
    props.$right &&
    css`
      justify-content: flex-end;
      column-gap: 0.25rem;
    `}
  width: 100%;
  padding-inline: 0.5rem;
  margin-bottom: 1.5rem;
  border: none;
`;
const StyledFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
  min-width: ${(props) => (props.$full ? "100%" : "")};
`;

const StyledInput = styled.input`
  font-size: 1rem;
  background: transparent;
  padding: 0.25rem;
  color: var(--text-on-primary);
  border: none;
  border-bottom: 1px solid var(--text-on-primary);
`;
const TitleInput = styled.textarea`
  border: none;
  background: transparent;
  color: var(--text-on-primary);
  font-size: 1.5rem;
  font-weight: 600;
  font-style: italic;
  border-bottom: 1px solid var(--text-on-primary);
  resize: none;
  overflow: hidden;
`;
const StyledSelect = styled.select`
  display: inline-flex;
  color: var(--text-on-primary);
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 1px solid var(--text-on-primary);
  gap: 0.625rem;
  border-radius: 2.5rem;
`;

const StyledTextarea = styled.textarea`
  font-size: 1rem;
  background: transparent;
  border: none;
  color: var(--text-on-primary);
  border-bottom: 1px solid var(--text-on-primary);
  padding: 0.25rem;
`;

const confirmDeleteMessage = "Are you sure you want to delete the event?";

export default function EventDetail({ event = {} }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate } = useSWR(`/api/events/${event._id}`);
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
        {/* ab hier ist das styling für die normale view */}
        {!isEditMode ? (
          <>
            <StyledImageContainer>
              <ArrowLeftIcon onClick={() => router.back()}>Back</ArrowLeftIcon>
              <StyledHeaderImage
                src={event?.cover?.url}
                alt={event.title}
                fill={true}
              />
              {session?.id && (
                <span>
                  {isAttending ? (
                    <Star onClick={handleToggleAttending} variant="filled" />
                  ) : (
                    <Star onClick={handleToggleAttending} />
                  )}
                </span>
              )}
            </StyledImageContainer>
            {isOwner && (
              <StyledContentBox $right>
                <Button edit onClick={() => setIsEditMode(true)}>
                  Edit
                </Button>
                <Button trash onClick={handleDelete}>
                  Delete
                </Button>
              </StyledContentBox>
            )}
            <StyledContentBox>
              <Paragraph size="large">{event.city}</Paragraph>

              {event.attendingUsers.length > 0 && (
                <AttendingUsersPreview attendingUsers={event.attendingUsers} />
              )}
              <SubHeading>{event.title}</SubHeading>
              <Label>{event.category}</Label>
            </StyledContentBox>
            <StyledContentGrid>
              <StyledThirdHeading>Start</StyledThirdHeading>
              <StyledThirdHeading>End</StyledThirdHeading>
              <Paragraph>{`${startDay}. ${startMonth} ${startYear}, ${startTime}`}</Paragraph>
              <Paragraph>{`${endDay}. ${endMonth} ${endYear}, ${endTime}`}</Paragraph>
              <StyledThirdHeading>Location</StyledThirdHeading>
              <Paragraph left>
                {event.address}
                <br />
                {event.postalCode} {event.city}
                <br />
                {event.country}
              </Paragraph>
            </StyledContentGrid>
            <StyledContentBox>
              <StyledThirdHeading>Description</StyledThirdHeading>
              <Paragraph full>{event.description}</Paragraph>
            </StyledContentBox>
          </>
        ) : (
          // ab hier ist das styling für den edit mode
          <StyledForm onSubmit={handleSubmit}>
            <StyledImageContainer>
              <StyledHeaderImage
                src={event?.cover?.url}
                alt={event.title}
                fill={true}
              />
            </StyledImageContainer>

            {isOwner && (
              <StyledContentBox $right>
                <Button type="submit" save>
                  Save
                </Button>
                <Button cancel onClick={() => setIsEditMode(false)}>
                  Cancel
                </Button>
              </StyledContentBox>
            )}
            <StyledFieldSet>
              <StyledFieldContainer>
                <StyledLabel htmlFor="title">Title</StyledLabel>
                <TitleInput
                  id="title"
                  defaultValue={event.title}
                  name="title"
                />
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabel htmlFor="category">Category</StyledLabel>
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
              </StyledFieldContainer>
            </StyledFieldSet>
            <StyledFieldSet>
              <StyledFieldContainer>
                <StyledLabel htmlFor="date">Start</StyledLabel>
                <StyledInput
                  id="date"
                  $short
                  type="datetime-local"
                  defaultValue={startDateString}
                  name="startDateTime"
                />
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabel htmlFor="date">End</StyledLabel>
                <StyledInput
                  $short
                  id="date"
                  type="datetime-local"
                  defaultValue={endDateString}
                  name="endDateTime"
                />
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabel htmlFor="address">Location</StyledLabel>
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
                <StyledInput
                  id="city"
                  defaultValue={event.city}
                  name="city"
                  autoComplete="address-level2"
                />
                <StyledInput
                  id="postalCode"
                  name="postalCode"
                  defaultValue={event.postalCode}
                  autoComplete="postal-code"
                />
                <StyledInput
                  id="country"
                  defaultValue={event.country}
                  name="country"
                  autoComplete="country-name"
                />
              </StyledFieldContainer>
            </StyledFieldSet>
            <StyledFieldSet>
              <StyledFieldContainer $full>
                <StyledLabel htmlFor="description">Description</StyledLabel>
                <StyledTextarea
                  id="description"
                  name="description"
                  defaultValue={event.description}
                />
              </StyledFieldContainer>
            </StyledFieldSet>
          </StyledForm>
        )}
        {event.coordinates && (
          <Map posLng={event.coordinates.lng} posLat={event.coordinates.lat} />
        )}
      </StyledContainer>
    </>
  );
}
