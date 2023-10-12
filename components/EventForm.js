import styled from "styled-components";
import { useRouter } from "next/router";
import { createNewEvent } from "@/lib/api";

const StyledForm = styled.form`
  padding-top: 3rem;
  margin-inline: auto;
  max-width: 36rem;
  padding-inline: 1rem;
  display: flex;
  flex-direction: column;
`;

export default function EventForm() {
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
        <label htmlFor="title">Title*</label>
        <input
          id="title"
          name="title"
          aria-label="Event Title"
          placeholder="Was is your event called?"
          required
        ></input>
        <label htmlFor="description">Description*</label>
        <textarea
          id="description"
          name="description"
          aria-label="event description"
          placeholder="Describe your event here"
          rows="5"
          required
        ></textarea>
        <label htmlFor="category">Category*</label>
        <select id="category" name="category" required>
          <option value=""> --Please pick a category-- </option>
          <option value="Nightlife & Clubs">Nightlife & Clubs</option>
          <option value="Culture & Arts">Culture & Arts</option>
          <option value="Liveshow">Liveshow</option>
          <option value="Activities & Games">Activities & Games</option>
          <option value="Live Shows"> Live Shows</option>
          <option value="Community Meet-up">Community Meet-up</option>
        </select>
        <label htmlFor="city">City*</label>
        <input
          id="city"
          name="city"
          aria-label="city of the event"
          placeholder="Where is your event happening?"
          required
        ></input>
        <label htmlFor="imageUrl">Picture*</label>
        <input
          id="imageUrl"
          name="imageUrl"
          aria-label="Unsplashed URL to a picture for the event"
          placeholder="Which Unsplashed URL should we use for your event?"
          required
        ></input>
        <label htmlFor="startDateTime">Start*</label>
        <input
          id="startDateTime"
          name="startDateTime"
          aria-label="Start of the event"
          type="datetime-local"
          required
        ></input>
        <label htmlFor="endDateTime">End*</label>
        <input
          id="endDateTime"
          name="endDateTime"
          aria-label="End of the event"
          type="datetime-local"
          // min startDateTime
          required
        ></input>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          aria-label="Location of the event"
          placeholder="Put in an adress or landmark where everyone should gather"
        ></input>
        <label htmlFor="organizer">Organizer</label>
        <input
          id="organizer"
          name="organizer"
          aria-label="Organizer of the event"
          placeholder="Pick your name of that of your organisation"
        ></input>
        <p> *required fields</p>
        <button type="Submit">Submit</button>
      </StyledForm>
    </>
  );
}
