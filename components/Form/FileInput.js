import { uploadImage } from "@/lib/utils";
import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
const StyledInput = styled.input``;

const StyledLabel = styled.label``;

export default function FileInput({ handleUpload }) {
  const [cover, setCover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onChange(event) {
    setIsLoading(true);
    const cover = await uploadImage(event.target.files[0]);
    setCover(cover);
    setIsLoading(false);
    handleUpload(cover);
  }

  return (
    <>
      <StyledLabel htmlFor="cover" id="coverLabel">
        Cover
        <StyledInput
          id="cover"
          aria-labelledby="coverLabel"
          required
          type="file"
          onChange={onChange}
        />
      </StyledLabel>
      {isLoading && <p>Image is uploading...</p>}
      {cover && (
        <Image
          src={cover?.url}
          width={cover?.width}
          height={cover?.height}
          alt="cover-image"
        />
      )}
    </>
  );
}
