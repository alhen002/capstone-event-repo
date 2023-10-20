import styled from "styled-components";
import { useRouter } from "next/router";
import { createNewEvent } from "@/lib/api";
import Button from "components/Button.js";
import { useState } from "react";
import ProgressBar from "./EventForm_ProgressBar";
import dynamic from "next/dynamic";
const AddressAutofill = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
  { ssr: false }
);
import Map from "./Map";

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
  display: ${(props) => {
    switch (props.$visibility) {
      case "visible":
        return "flex";
      case "hidden":
        return "none";
      default:
        return "none";
    }
  }};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  max-width: 36rem;
`;

export default function EventForm() {
  const [formStep, setFormStep] = useState(0);
  const currentStep = formStep; // unnötig oder?
  const stepCount = 4;

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();
  const [eventAddress, setEventAddress] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [city, setCity] = useState();
  const [PLZ, setPLZ] = useState();
  const [country, setCountry] = useState();
  const [organizer, setOrganizer] = useState();

  const nextFormStep = () => setFormStep(formStep + 1);
  const prevFormStep = () => setFormStep(formStep - 1);

  const today = new Date().toISOString().slice(0, -8);
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);

    // needs to be manual to avoid using auto name of mapbox

    const events = {
      title: formObject.title,
      city: formObject.city,
      address: eventAddress, // used state instead of formObject because autofill automatically adds address-search to the name.
      coordinates: { lng: coordinates[0], lat: coordinates[1] },
      postalCode: formObject.postalCode,
      country: formObject.country,
      category: formObject.category,
      description: formObject.description,
      imageUrl: formObject.imageUrl,
      startDateTime: formObject.startDateTime,
      endDateTime: formObject.endDateTime,
      organizer: formObject.organizer,
    };

    createNewEvent(events);
    console.log(events);
    event.target.reset();
    router.push("/");
  }

  return (
    <>
      <ProgressBar currentStep={currentStep} />
      <StyledForm onSubmit={handleSubmit}>
        <h2>Add an event</h2>

        <StyledFieldset
          $visibility={
            formStep == 0 || formStep == stepCount ? "visible" : "hidden"
          }
        >
          <legend>Event Basics</legend>
          <label htmlFor="title" id="titleLabel">
            Title*
          </label>
          <input
            id="title"
            name="title"
            aria-labelledby="titleLabel"
            placeholder="What is your event called?"
            onChange={(event) => settitle(event.target.value)}
            value={title}
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

        <StyledFieldset
          $visibility={
            formStep == 1 || formStep == stepCount ? "visible" : "hidden"
          }
        >
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

          <label htmlFor="imageUrl" id="imageLabel">
            Picture*
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            aria-labelledby="imageLabel"
            placeholder="Which https://images.unsplash.com/ URL should we use for your event?"
            type="url"
            onChange={(event) => setImageUrl(event.target.value)}
            value={imageUrl}
            pattern="^https://images\.unsplash\.com/.*$"
            required
          />
          {formStep < stepCount && <small> *required fields</small>}
        </StyledFieldset>

        <>
          <StyledFieldset
            $visibility={
              formStep == 2 || formStep == stepCount ? "visible" : "hidden"
            }
          >
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
            ></input>

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
            ></input>

            {formStep < stepCount && <small> *required fields</small>}
          </StyledFieldset>

          <AddressAutofill accessToken={mapboxAccessToken}>
            <StyledFieldset
              $visibility={
                formStep == 3 || formStep == stepCount ? "visible" : "hidden"
              }
            >
              <legend>Event Location</legend>

              <label htmlFor="address" id="addressLabel">
                Address*
              </label>
              <input
                id="address"
                aria-labelledby="addressLabel"
                placeholder="Street"
                autoComplete="street-address"
                value={eventAddress}
                onBlur={(event) => setEventAddress(event.target.value)}
                required
              />

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
              ></input>

              <label htmlFor="PLZ" id="PLZLabel">
                PLZ*
              </label>
              <input
                id="PLZ"
                name="PLZ"
                aria-labelledby="PLZLabel"
                autoComplete="postal-code"
                value={PLZ}
                onChange={(event) => setPLZ(event.target.value)}
                required
              ></input>

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
              ></input>

              <label htmlFor="organizer" id="organizerLabel">
                Organizer
              </label>
              <input
                id="organizer"
                name="organizer"
                aria-labelledby="organizerLabel"
                placeholder="Pick your name or that of your organisation"
                onChange={(event) => setOrganizer(event.target.value)}
                value={organizer}
              ></input>

              <Map
                eventAddress={eventAddress}
                setCoordinates={setCoordinates}
              />

              <small> *required fields</small>
            </StyledFieldset>
          </AddressAutofill>
        </>

        <ButtonContainer>
          {formStep > 0 && <Button onClick={prevFormStep}>Back</Button>}
          {formStep < 3 && <Button onClick={nextFormStep}>Next</Button>}
          {formStep === 3 && (
            <Button onClick={nextFormStep}>Check all entered Data</Button>
          )}
          {formStep === stepCount && (
            <Button color="green" type="submit">
              Submit
            </Button>
          )}
        </ButtonContainer>
      </StyledForm>
    </>
  );
}
