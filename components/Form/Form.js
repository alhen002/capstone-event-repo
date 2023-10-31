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
import Input from "./Input";
import TextArea from "./Textarea";
import Select from "./Select";
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
    await createNewEvent(allData);
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
      >
        <Input title="Title" required />
        <TextArea title="Description" required />
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
          title="Category"
          options={[
            "Nightlife & Clubs",
            "Culture & Arts",
            "Activities & Games",
            "Live Shows",
            "Community Meet-up",
          ]}
        />
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
        <Input title="Start Date" type="datetime-local" required min={today} />
        <Input title="End Date" type="datetime-local" required />
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
          <Input required autoComplete="street-address" title="Address" />
        </AddressAutofill>
        <Input required autoComplete="address-level2" title="City" />
        <Input required autoComplete="postal-code" title="Postal Code" />
        <Input required autoComplete="country-name" title="Country" />
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
