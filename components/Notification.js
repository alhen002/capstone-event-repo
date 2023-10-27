import { Toaster } from "react-hot-toast";
import styled from "styled-components";

export default function Notification() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 3500,
        style: {
          background: "#363636",
          color: "#fff",
        },
        // Default options for specific types
        success: {
          duration: 3500,
          icon: "👏",
          style: {
            background: "#D7C3FA",
            color: "#340A7E",
            padding: "0.75rem",
          },
        },
      }}
    />
  );
}
