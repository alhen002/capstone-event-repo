import styled, { css } from "styled-components";

const sizes = {
  medium: css`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    margin-bottom: 0.75rem;
  `,
  large: css`
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 2rem;
  `,
};

const StyledParagraph = styled.p`
  color: var(--text-on-primary);
  ${(props) => sizes[props.size]}
  grid-column: ${(props) => (props.$left ? "1 / 1" : "")};
`;

StyledParagraph.defaultProps = {
  size: "medium",
};

export default function Paragraph({ children, size, left }) {
  return (
    <StyledParagraph $left={left} $size={size}>
      {children}
    </StyledParagraph>
  );
}
