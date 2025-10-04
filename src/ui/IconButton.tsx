import { type LucideIcon } from "lucide-react";
import styled, { useTheme } from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  transition: ease-in-out 0.1s;
  &:hover {
    background-color: ${({ theme }) => theme.iconButton.hover};
  }
  &:focus,
  &:focus-visible {
    outline: 2px solid;
    outline-color: ${({ theme }) => theme.iconButton.outline};
  }
  &:active {
    background-color: ${({ theme }) => theme.iconButton.pressed};
  }
`;

export const IconButton = ({
  Icon,
  ariaLabel,
}: {
  Icon: LucideIcon;
  ariaLabel?: string;
}) => {
  const theme = useTheme();
  return (
    <StyledButton aria-label={ariaLabel}>
      <Icon size={24} color={theme.fill.primary} />
    </StyledButton>
  );
};
