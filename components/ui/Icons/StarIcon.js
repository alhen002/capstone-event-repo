import styled from "styled-components";
import { StarIcon } from "@heroicons/react/24/outline";

const StyledStarIcon = styled(StarIcon)`
  height: 40px;
  width: 40px;
  ${(props) => {
    switch (props.$variant) {
      case "filled":
        return " stroke: var(--primary); fill: var(--primary); ";
      default:
        return "stroke: var(--primary); ";
    }
  }}
  position: absolute;
  top: 12px;
  right: 12px;
  transition: 1s;
  transition: 1s;
  z-index: 2;
`;
export default function Star({ variant }) {
  return <StyledStarIcon $variant={variant} />;
}
