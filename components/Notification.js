import { Toaster } from "react-hot-toast";

export default function Notification() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      toastOptions={{
        className: "",
        duration: 3500,
        style: {
          background: "#363636",
          color: "#fff",
        },
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
