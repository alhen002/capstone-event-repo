import Button from "@/components/Button";
import styled from "styled-components";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { useRouter } from "next/router";
const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default function Custom404() {
  const router = useRouter();
  return (
    <StyledSection>
      <Heading>404</Heading>
      <Paragraph size="medium">
        Sorry, the page you requested was not found.
      </Paragraph>
      <Button onClick={() => router.push("/")}>Back to Home</Button>
    </StyledSection>
  );
}
