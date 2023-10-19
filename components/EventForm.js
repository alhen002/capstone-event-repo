import styled from "styled-components";
import { useRouter } from "next/router";
import { createNewEvent } from "@/lib/api";
import Button from "components/Button.js";
import { useState } from "react";
import ProgressBar from "./EventForm_ProgressBar";
import { AddressAutofill } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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
  const currentStep = formStep;
  const stepCount = 4;

  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();

  const nextFormStep = () => setFormStep(formStep + 1);
  const prevFormStep = () => setFormStep(formStep - 1);

  const today = new Date().toISOString().slice(0, -8);

  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const events = Object.fromEntries(formData);
    createNewEvent(events);

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
            required
          ></input>

          <label htmlFor="description" id="descriptionLabel">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            aria-labelledby="descriptionLabel"
            placeholder="Describe your event here"
            rows="5"
            required
          ></textarea>
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
            pattern="^https://images\.unsplash\.com/.*$"
            required
          ></input>
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
                name="location"
                aria-labelledby="addressLabel"
                placeholder="Street"
                autoComplete="street-address"
                required
              ></input>

              <label htmlFor="city" id="cityLabel">
                City*
              </label>
              <input
                id="city"
                name="city"
                aria-labelledby="cityLabel"
                placeholder="Where is your event happening?"
                autoComplete="address-level2"
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
                required
              ></input>

              <label htmlFor="organizer" id="organizerLabel">
                Organizer
              </label>
              <input
                id="organizer"
                name="organizer"
                aria-labelledby="organizerLabel"
                placeholder="Pick your name of that of your organisation"
              ></input>

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
