import styled from "styled-components";
import { useRouter } from "next/router";
import { createNewEvent } from "@/lib/api";
import Button from "components/Button.js";
import { useState } from "react";

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
`;

export default function EventForm() {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep(formStep + 1);
  const prevFormStep = () => setFormStep(formStep - 1);

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
      <StyledForm onSubmit={handleSubmit}>
        <h2>Add an event</h2>

        {formStep === 0 && (
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

            <Button onClick={nextFormStep}>Next</Button>
          </StyledFieldset>
        )}

        {formStep === 1 && (
          <StyledFieldset>
            <legend>Category and City</legend>

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

            <label htmlFor="city" id="cityLabel">
              City*
            </label>
            <input
              id="city"
              name="city"
              aria-labelledby="cityLabel"
              placeholder="Where is your event happening?"
              required
            ></input>

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
            <Button onClick={prevFormStep}>Back</Button>
            <Button onClick={nextFormStep}>Next</Button>
          </StyledFieldset>
        )}

        {formStep === 2 && (
          <>
            <StyledFieldset>
              <legend>Event Details</legend>
              <label htmlFor="startDateTime" id="startDateTimeLabel">
                Start*
              </label>
              <input
                id="startDateTime"
                name="startDateTime"
                aria-labelledby="startDateTimeLabel"
                type="datetime-local"
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
                required
              ></input>

              <label htmlFor="location" id="locationLabel">
                Location
              </label>
              <input
                id="location"
                name="location"
                aria-labelledby="locationLabel"
                placeholder="Put in an adress or landmark where everyone should gather"
              ></input>
            </StyledFieldset>
            <StyledFieldset>
              <legend>About you</legend>
              <label htmlFor="organizer" id="organizerLabel">
                Organizer
              </label>
              <input
                id="organizer"
                name="organizer"
                aria-labelledby="organizerLabel"
                placeholder="Pick your name of that of your organisation"
              ></input>
              <p> *required fields</p>
              <Button onClick={prevFormStep}>Back</Button>
              <Button color={"green"} type="Submit">
                Submit
              </Button>
            </StyledFieldset>
          </>
        )}
      </StyledForm>
    </>
  );
}
