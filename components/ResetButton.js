import Button from "./Button";

export default function ResetButton({ reset, children }) {
  return (
    <Button onClick={reset} variant="secondary">
      {children}
    </Button>
  );
}
