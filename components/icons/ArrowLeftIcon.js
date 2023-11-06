import styled from "styled-components";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
const StyledArrowLeft = styled(ArrowLeftIcon)`
  position: absolute;
  color: var(--primary);
  top: 12px;
  left: 12px;
    height: 40px;
    width: 40px;
    &:hover {
      cursor: pointer;
    }
`


export default function ArrowLeft({onClick}){
  return <StyledArrowLeft onClick={onClick}/>
}
