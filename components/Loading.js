import { StyledContainer } from "./Error";
import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    async function getLoader() {
      const { ring } = await import("ldrs");
      ring.register();
    }
    getLoader();
  }, []);

  return (
    <StyledContainer>
      <l-ring color="var(--primary)"></l-ring>
    </StyledContainer>
  );
}
