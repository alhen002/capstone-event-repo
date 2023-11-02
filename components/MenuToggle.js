import styled from "styled-components";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";

const StyledMenuToggle = styled.div`
  cursor: pointer;
  font-size: xx-large;
  align-self: center;
  place-self: center;
`;

const StyledBarMenu = styled(Bars3Icon)`
  height: 24px;
  width: 24px;
  stroke: var(--primary);
`;

const StyledXMark = styled(XMarkIcon)`
  height: 24px;
  width: 24px;
  stroke: var(--primary);
`;

const StyledProfileImage = styled(Image)`
  border-radius: 50%;
  display: flex;
  justify-content: center;
`;

export default function MenuToggle({ menuOpen, handleToggleMenu }) {
  const { data: session } = useSession();
  return (
    <StyledMenuToggle onClick={handleToggleMenu}>
      {menuOpen ? (
        <StyledXMark />
      ) : !session?.user ? (
        <StyledBarMenu />
      ) : (
        <StyledProfileImage
          alt={session?.user.name}
          src={session?.user.image}
          height={40}
          width={40}
        />
      )}
    </StyledMenuToggle>
  );
}
