import { uploadImage } from "@/lib/api";
import { useState } from "react";
import Loading from "@/components/Loading";
import styled from "styled-components";
import Image from "next/image";
import Button from "../Button";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 36rem;
`;
const ImageContainer = styled.div`
  max-width: 36rem;
  display: grid;
  place-items: center;
  height: 12rem;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid var(--primary);
  position: relative;
`;
const StyledImage = styled(Image)`
  object-fit: cover;
  z-index: 1;
`;

const StyledParagraph = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-accent);
`;

const StyledLoading = styled(Loading)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledInput = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  color: var(--primary);
  border: 1px solid var(--primary);
  background-color: var(--background);
  width: 100%;
`;
const StyledLabel = styled.label`
  color: var(--text-accent);
  font-size: 1rem;
  font-family: inherit;
  font-style: normal;
  font-weight: 500;
`;

export default function FileInput({ handleUpload, required }) {
  const [cover, setCover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleChange(event) {
    setCover(null);
    setIsLoading(true);
    const cover = await uploadImage(event.target.files[0]);
    setCover(cover);
    setIsLoading(false);
    handleUpload(cover);
  }
  async function handleDelete(event) {
    setCover(null);
  }

  return (
    <StyledContainer>
      <StyledLabel htmlFor="cover" id="coverLabel">
        Cover
        <span>{required && `*`}</span>
        <StyledInput
          id="cover"
          aria-labelledby="coverLabel"
          required={required}
          type="file"
          onChange={handleChange}
        />
      </StyledLabel>

      <ImageContainer>
        {isLoading && <StyledLoading />}
        {!cover && !isLoading && (
          <StyledParagraph>Upload a cover image</StyledParagraph>
        )}
        {cover && (
          <Button variant="delete" onClick={handleDelete}>
            Remove
          </Button>
        )}
        {cover && (
          <StyledImage
            alt="new-cover-image"
            src={cover?.url}
            fill={true}
            quality={30}
          />
        )}
      </ImageContainer>
    </StyledContainer>
  );
}
