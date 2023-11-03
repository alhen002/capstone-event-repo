import styled from "styled-components";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const StyledArrowLeft = styled(ArrowLeftIcon)`
  width: 20px;
  height: 16px;
  ${(props) => {
  switch (props.$variant) {
    case "secondary":
      return "fill: var(--primary); stroke: var(--primary);";
    default:
      return "fill: var(--background); stroke: var(--background);";
  }
}};
`;

const StyledTrash = styled(TrashIcon)`
  width: 16px;
  height: 14px;
  `
const StyledEdit = styled(PencilIcon)`
  width: 16px;
  height: 14px;
  `

const StyledArrowRight = styled(ArrowRightIcon)`
  width: 20px;
  height: 16px;
  ${(props) => {
  switch (props.$variant) {
    case "secondary":
      return "fill: var(--primary); stroke: var(--primary);";
    default:
      return "fill: var(--background); stroke: var(--background);";
  }
}};
`;

const StyledButton = styled.button`
  display: inline-flex;
  padding: 0.25rem 0.35rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  
  font-size: 0.75rem;
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

export default function Button({ children, variant, onClick, arrow, href, trash, edit }) {
  return (
    <>
      {href ? (
        <StyledLink href={href} $variant={variant}>
          {children}
        </StyledLink>
      ) : (
        <StyledButton onClick={onClick} $variant={variant}>
          {arrow === "left" && <StyledArrowLeft $variant={variant} />}
          {trash && <StyledTrash />}
          {edit && <StyledEdit />}
          {children}
          {arrow === "right" && <StyledArrowRight $variant={variant} />}
        </StyledButton>
      )}
    </>
  );
}
