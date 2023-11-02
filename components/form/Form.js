import styled from "styled-components";
import { useRouter } from "next/router";
import { createNewEvent } from "@/lib/api";
import { useState } from "react";
import ProgressBar from "./Progressbar";
import dynamic from "next/dynamic";
import Map from "../Map";
import useSWR from "swr";
import toast from "react-hot-toast";
import Step from "./Step";
import FileInput from "./FileInput";
import Input from "./Input";
import TextArea from "./Textarea";
import Select from "./Select";
import EventPreview from "./EventPreview";

const AddressAutofill = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
  { ssr: false }
);

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function EventForm() {
  const router = useRouter();
  const { mutate } = useSWR("/api/events");
  const [step, setStep] = useState(0);
  const [allData, setAllData] = useState({});

  const today = new Date().toISOString().slice(0, -8);

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

  async function handleCreateEvent() {
    await createNewEvent(allData);
    setAllData({});
    mutate();
    toast.success("You've successfully created your event.");
    router.push("/");
  }
  function handleSetAllData(data) {
    setAllData((prev) => ({ ...prev, ...data }));
  }

  function handleBackToStart() {
    setStep(0);
    setAllData({});
  }
  function handleNext() {
    setStep((prev) => prev + 1);
  }
  function handleUpload(image) {
    setAllData((prev) => ({ ...prev, cover: image }));
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
        allData={allData}
      >
        <Input
          label="Title"
          required
          handleSetAllData={handleSetAllData}
          name="title"
        />
        <TextArea
          label="Description"
          name="description"
          required
          handleSetAllData={handleSetAllData}
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
        <Select
          required
          label="Category"
          name="category"
          handleSetAllData={handleSetAllData}
          options={[
            "Nightlife & Clubs",
            "Culture & Arts",
            "Activities & Games",
            "Live Shows",
            "Community Meet-up",
          ]}
        />
        <FileInput handleUpload={handleUpload} required />
      </Step>
      <Step
        index={2}
        legend="Date & Time"
        handleNext={handleNext}
        isVisible={step === 2}
        step={step}
        handleBackToStart={handleBackToStart}
      >
        <Input
          label="Start Date"
          name="startDateTime"
          type="datetime-local"
          required
          min={today}
          handleSetAllData={handleSetAllData}
        />
        <Input
          label="End Date"
          name="endDateTime"
          type="datetime-local"
          required
          handleSetAllData={handleSetAllData}
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
        <AddressAutofill
          accessToken={mapboxAccessToken}
          onRetrieve={handleRetrievedAutofill}
        >
          <Input
            required
            autoComplete="street-address"
            label="Address"
            name="address"
            handleSetAllData={handleSetAllData}
          />
        </AddressAutofill>
        <Input
          required
          autoComplete="address-level2"
          label="City"
          name="city"
          handleSetAllData={handleSetAllData}
        />
        <Input
          required
          autoComplete="postal-code"
          label="Postal Code"
          name="postalCode"
          handleSetAllData={handleSetAllData}
        />
        <Input
          required
          autoComplete="country-name"
          label="Country"
          name="country"
          handleSetAllData={handleSetAllData}
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
        handleBackToStart={handleBackToStart}
        legend="Your new Event"
        handleCreateEvent={handleCreateEvent}
        step={step}
      >
        <EventPreview event={allData} />
      </Step>
    </section>
  );
}
