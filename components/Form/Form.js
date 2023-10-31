import styled from "styled-components";
import { useRouter } from "next/router";
import { createNewEvent } from "@/lib/api";
import Button from "components/Button.js";
import { useState } from "react";
import ProgressBar from "./EventFormProgressBar";
import dynamic from "next/dynamic";
import Map from "../Map";
import useSWR from "swr";
import toast from "react-hot-toast";
import Step from "./Step";
import ImageInput from "./FileInput";

const AddressAutofill = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
  { ssr: false }
);

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function EventForm() {
  const router = useRouter();
  const { mutate } = useSWR("/api/Events");

  const [step, setStep] = useState(0);
  const [allData, setAllData] = useState({});
  // form data
  const today = new Date().toISOString().slice(0, -8);

  // handle functions
  const handleRetrievedAutofill = (response) => {
    const feature = response.features[0];
    setAllData((prev) => {
      return {
        ...prev,
        coordinates: {
          lng: feature.geometry.coordinates[0],
          lat: feature.geometry.coordinates[1],
        },
      };
    });
  };

  async function handleSubmit() {
    // await createNewEvent(allData);
    console.log(allData);
    setAllData({});
    mutate();
    toast.success("You've successfully created your event.");
    router.push("/");
  }

  function handleNext(data) {
    setAllData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  }

  function handleBackToStart() {
    setStep(0);
  }

  function handleUpload(image) {
    setAllData((prev) => ({ ...prev, image }));
  }

  return (
    <section>
      <ProgressBar currentStep={step} />
      <Step
        index={0}
        handleNext={handleNext}
        isVisible={step === 0}
        legend="General Information"
        step={step}
        handleBackToStart={handleBackToStart}
      >
        <label htmlFor="title" id="titleLabel">
          Title*
        </label>
        <input
          id="title"
          name="title"
          aria-labelledby="titleLabel"
          placeholder="What is your event called?"
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
          rows="5"
          required
        />
      </Step>
      <Step
        index={1}
        handleNext={handleNext}
        legend="Details"
        isVisible={step === 1}
        step={step}
        handleBackToStart={handleBackToStart}
      >
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
        <ImageInput handleUpload={handleUpload} />
      </Step>

      <Step
        index={2}
        legend="Date & Time"
        handleNext={handleNext}
        isVisible={step === 2}
        step={step}
        handleBackToStart={handleBackToStart}
      >
        <label htmlFor="startDateTime" id="startDateTimeLabel">
          Start*
        </label>
        <input
          id="startDateTime"
          name="startDateTime"
          aria-labelledby="startDateTimeLabel"
          type="datetime-local"
          min={today}
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
          required
        />
      </Step>
      <Step
        legend="Location"
        index={3}
        handleNext={handleNext}
        isVisible={step === 3}
        step={step}
        handleBackToStart={handleBackToStart}
      >
        <label htmlFor="address" id="addressLabel">
          Address*
        </label>
        <AddressAutofill
          accessToken={mapboxAccessToken}
          onRetrieve={handleRetrievedAutofill}
        >
          <input
            id="address"
            aria-labelledby="addressLabel"
            placeholder="Street"
            autoComplete="street-address"
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
          required
        />
        <Map
          posLng={allData?.coordinates?.lng}
          posLat={allData?.coordinates?.lat}
        />
      </Step>

      <Step
        index={4}
        isVisible={step === 4}
        handleNext={handleNext}
        legend="Check your Data"
        step={step}
        handleBackToStart={handleBackToStart}
      >
        <pre>{JSON.stringify(allData, null, 2)}</pre>
        <Button variant="confirm" onClick={handleSubmit}>
          Submit
        </Button>
      </Step>
    </section>
  );
}
