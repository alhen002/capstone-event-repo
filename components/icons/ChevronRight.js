import { ChevronRightIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";

export default function ChevronRight({ variant }) {
  return <StyledChevronRight $variant={variant} />;
}

export const StyledChevronRight = styled(ChevronRightIcon)`
  height: 44px;
  width: 44px;
  ${(props) => {
    switch (props.$variant) {
      case "category":
        return "stroke: var(--text-accent);";
      default:
        return "stroke: var(--background); position: absolute; right: 12px; bottom: 16px;";
    }
  }};
`;
