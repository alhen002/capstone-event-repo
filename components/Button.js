import styled from "styled-components";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const StyledArrowLeft = styled(ArrowLeftIcon)`
  width: 20px;
  height: 16px;
  ${(props) => {
    switch (props.$variant) {
      case "secondary":
        return "fill: var(--primary); stroke: var(--primary);";
      case "none":
        return "fill: var(--text-accent); stroke: var(--text-accent);";
      default:
        return "fill: var(--background); stroke: var(--background);";
    }
  }};
`;

const StyledArrowRight = styled(ArrowRightIcon)`
  width: 20px;
  height: 16px;
  ${(props) => {
    switch (props.$variant) {
      case "secondary":
        return "fill: var(--primary); stroke: var(--primary);";
      case "none":
        return "fill: var(--text-accent); stroke: var(--text-accent);";
      default:
        return "fill: var(--background); stroke: var(--background);";
    }
  }};
`;

const StyledButton = styled.button`
  display: inline-flex;
  padding: 8px 9px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 32px;
  text-decoration: ${(props) => (props.$active ? "underline" : "none")};

  &:hover {
    ${(props) => {
      switch (props.$variant) {
        case "secondary":
          return "background-color: var(--secondary-pressed)";
        default:
          return "background-color: var(--primary-pressed)";
      }
    }}
  }

  ${(props) => {
    switch (props.$variant) {
      case "secondary":
        return "background-color: var(--background); border: 1.5px solid var(--primary); color: var(--primary)";
      case "none":
        return "border: none; background-color: var(--background);";
      default:
        return "background-color: var(--primary); border: 1.5px solid var(--background); color: var(--text-on-primary) ";
    }
  }}
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  padding: 16px 18px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 32px;
  &:hover {
    ${(props) => {
      switch (props.$variant) {
        case "secondary":
          return "background-color: var(--secondary-pressed)";
        default:
          return "background-color: var(--primary-pressed)";
      }
    }}
  }

  ${(props) => {
    switch (props.$variant) {
      case "secondary":
        return "background-color: var(--background); border: 1.5px solid var(--primary); color: var(--primary)";
      default:
        return "background-color: var(--primary); border: 1.5px solid var(--background); color: var(--text-on-primary) ";
    }
  }}
`;

export default function Button({ children, variant, onClick, arrow, href }) {
  return (
    <>
      {href ? (
        <StyledLink href={href} $variant={variant}>
          {children}
        </StyledLink>
      ) : (
        <StyledButton onClick={onClick} $variant={variant}>
          {arrow == "left" && <StyledArrowLeft $variant={variant} />}
          {children}
          {arrow == "right" && <StyledArrowRight $variant={variant} />}
        </StyledButton>
      )}
    </>
  );
}
