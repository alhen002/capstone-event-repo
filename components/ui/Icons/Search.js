import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";

export default function SearchIcon({ variant }) {
  return <StyledSearchIcon $variant={variant} />;
}

export const StyledSearchIcon = styled(MagnifyingGlassIcon)`
  height: 24px;
  width: 24px;
  ${(props) => {
    switch (props.$variant) {
      case "accent":
        return "stroke: var(--text-accent);";
      default:
        return "stroke: var(--text-accent); ";
    }
  }};
`;
