import styled, { css } from "styled-components";

const sizes = {
  medium: css`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
  `,
  large: css`
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 2rem;
  `,
};

const StyledParagraph = styled.p`
  ${(props) => sizes[props.size]}
`;

StyledParagraph.defaultProps = {
  size: "medium",
};

export default function Paragraph({ children, size }) {
  return <StyledParagraph $size={size}>{children}</StyledParagraph>;
}
