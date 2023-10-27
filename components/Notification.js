import { Toaster } from "react-hot-toast";
import styled from "styled-components";

const CustomToastContainer = styled.div`
  background: #363636;
  color: #fff;
  border-radius: 5px;
  padding: 10px;
`;

const CustomToastSuccess = styled(CustomToastContainer)`
  background: #d7c3fa;
`;

const CustomToastError = styled(CustomToastContainer)`
  background: #f44336;
`;
export default function Notification() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
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
