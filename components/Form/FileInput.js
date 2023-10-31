import { useRef, useEffect } from "react";

export default function FileInput({ onSetFile, file }) {
  const inputRef = useRef(file);

  useEffect(() => {
    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      inputRef.current.files = dataTransfer.files[0];
    }
  }, [file]);

  function handleChangeFile(event) {
    onSetFile(event.target.files[0]);
  }

  return (
    <input
      type="file"
      ref={inputRef}
      data-testid="uploader"
      onChange={handleChangeFile}
    />
  );
}
