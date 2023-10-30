import styled from "styled-components";
import { useRouter } from "next/router";
import { createNewEvent } from "@/lib/api";
import Button from "components/Button.js";
import { useState } from "react";
import ProgressBar from "./EventFormProgressBar";
import dynamic from "next/dynamic";
import Map from "./Map";
import useSWR from "swr";
import toast from "react-hot-toast";
import { uploadImage } from "@/lib/utils";
import FileInput from "./FileInput";
const AddressAutofill = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
  { ssr: false }
);

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const StyledForm = styled.form`
  padding-top: 3rem;
  margin-inline: auto;
  max-width: 36rem;
  padding-inline: 1rem;
  display: flex;
  flex-direction: column;
`;
const StyledFieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  max-width: 36rem;
`;

export default function EventForm() {
  const [formStep, setFormStep] = useState(0);
  const { mutate } = useSWR("/api/Events");
  const stepCount = 4;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lng: 15.27875,
    lat: 37.073955,
  });
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [file, setFile] = useState(null);

  const nextFormStep = () => setFormStep(formStep + 1);
  const prevFormStep = () => setFormStep(formStep - 1);

  const today = new Date().toISOString().slice(0, -8);
  const router = useRouter();

  const handleRetrievedAutofill = (response) => {
    const feature = response.features[0];
    const object = {
      lng: feature.geometry.coordinates[0],
      lat: feature.geometry.coordinates[1],
    };
    setCoordinates(object);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const events = {
      title,
      city,
      address,
      coordinates,
      postalCode,
      country,
      category,
      description,
      imageUrl,
      startDateTime,
      endDateTime,
    };

    await createNewEvent(events);

    event.target.reset();
    mutate();
    toast.success("You've successfully created your event.");
    router.push("/");
  }

  return (
    <>
      <ProgressBar currentStep={formStep} />
      <StyledForm onSubmit={handleSubmit}>
        <h2>Add an event</h2>

        {formStep == 0 || formStep == stepCount ? (
          <StyledFieldset>
            <legend>Event Basics</legend>

            <label htmlFor="title" id="titleLabel">
              Title*
            </label>
            <input
              id="title"
              name="title"
              aria-labelledby="titleLabel"
              placeholder="What is your event called?"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            <label htmlFor="description" id="descriptionLabel">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              aria-labelledby="descriptionLabel"
              placeholder="Describe your event here"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
              rows="5"
              required
            />
            {formStep < stepCount && <small> *required fields</small>}
          </StyledFieldset>
        ) : (
          ""
        )}
        {formStep == 1 || formStep == stepCount ? (
          <StyledFieldset>
            <legend>Event Details</legend>

            <label htmlFor="category" id="categoryLabel">
              Category*
            </label>
            <select
              id="category"
              name="category"
              aria-labelledby="categoryLabel"
              required
              onChange={(event) => setCategory(event.target.value)}
              value={category}
            >
              <option value=""> --Please pick a category-- </option>
              <option value="Nightlife & Clubs">Nightlife & Clubs</option>
              <option value="Culture & Arts">Culture & Arts</option>
              <option value="Activities & Games">Activities & Games</option>
              <option value="Live Shows"> Live Shows</option>
              <option value="Community Meet-up">Community Meet-up</option>
            </select>

            {/* <label htmlFor="cover" id="coverLabel">
              Cover
            </label>
            <input
              id="cover"
              name="cover"
              aria-labelledby="coverLabel"
              type="file"
              onChange={(event) => setImageUrl(event.target.value)}
              value={imageUrl}
              pattern="^https://images\.unsplash\.com/.*$"
              required
            /> */}

            <FileInput onSetFile={setFile} file={file} />
          </StyledFieldset>
        ) : (
          ""
        )}

        {formStep == 2 || formStep == stepCount ? (
          <StyledFieldset>
            <legend>Event Time</legend>
            <label htmlFor="startDateTime" id="startDateTimeLabel">
              Start*
            </label>
            <input
              id="startDateTime"
              name="startDateTime"
              aria-labelledby="startDateTimeLabel"
              type="datetime-local"
              min={today}
              max={endDateTime}
              onChange={(event) => setStartDateTime(event.target.value)}
              value={startDateTime}
              required
            />

            <label htmlFor="endDateTime" id="endDateTimeLabel">
              End*
            </label>
            <input
              id="endDateTime"
              name="endDateTime"
              aria-labelledby="endDateTimeLabel"
              type="datetime-local"
              min={startDateTime}
              onChange={(event) => setEndDateTime(event.target.value)}
              value={endDateTime}
              required
            />

            {formStep < stepCount && <small> *required fields</small>}
          </StyledFieldset>
        ) : (
          ""
        )}

        {formStep == 3 || formStep == stepCount ? (
          <StyledFieldset>
            <legend>Event Location</legend>
            <label htmlFor="address" id="addressLabel">
              Address*
            </label>{" "}
            <AddressAutofill
              accessToken={mapboxAccessToken}
              onRetrieve={handleRetrievedAutofill}
            >
              <input
                id="address"
                aria-labelledby="addressLabel"
                placeholder="Street"
                autoComplete="street-address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </AddressAutofill>
            <label htmlFor="city" id="cityLabel">
              City*
            </label>
            <input
              id="city"
              name="city"
              aria-labelledby="cityLabel"
              placeholder="Where is your event happening?"
              autoComplete="address-level2"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
            />
            <label htmlFor="postalCode" id="postalCodeLabel">
              PLZ*
            </label>
            <input
              id="postalCode"
              name="postalCode"
              aria-labelledby="postalCodeLabel"
              autoComplete="postal-code"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              required
            />
            <label htmlFor="country" id="countryLabel">
              Country*
            </label>
            <input
              id="country"
              name="country"
              aria-labelledby="countryLabel"
              autoComplete="country-name"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              required
            />
            <Map posLng={coordinates.lng} posLat={coordinates.lat} />
          </StyledFieldset>
        ) : (
          ""
        )}
        <ButtonContainer>
          <small> *required fields</small>
          {formStep > 0 && <Button onClick={prevFormStep}>Back</Button>}
          {formStep < 3 && <Button onClick={nextFormStep}>Next</Button>}
          {formStep === 3 && (
            <Button onClick={nextFormStep}>Check all entered Data</Button>
          )}
          {formStep === stepCount && (
            <Button variant="confirm" type="submit">
              Submit
            </Button>
          )}
        </ButtonContainer>
      </StyledForm>
    </>
  );
}
