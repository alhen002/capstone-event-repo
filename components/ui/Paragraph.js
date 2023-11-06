import styled, { css } from "styled-components";

const sizes = {
  medium: css`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    margin-bottom: 0.75rem;
  `,
  large: css`
    font-size: 1.75rem;
    font-weight: 400;
    line-height: 2.5rem;
    color: var(--subtle-text-on-primary);
  `,
};

const StyledParagraph = styled.p`
  color: ${(props) => {
    switch (props.$color) {
      case "accent":
        return "var(--text-accent)";
      default:
        return "var(--text-on-primary)";
    }
  }};
  ${(props) => sizes[props.$size]}
  grid-column: ${(props) => (props.$left ? "1 / 1" : "")};
`;

StyledParagraph.defaultProps = {
  size: "medium",
};

export default function Paragraph({ children, size, left, color }) {
  return (
    <StyledParagraph $left={left} $size={size} $color={color}>
      {children}
    </StyledParagraph>
  );
}
