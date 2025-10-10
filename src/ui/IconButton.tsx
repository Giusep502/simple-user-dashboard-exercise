import { type LucideIcon } from "lucide-react";
import styled, { useTheme } from "styled-components";
import type { Theme } from "./theme";

const StyledButton = styled.button`
  -webkit-tap-highlight-color: transparent;
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

interface IconButtonProps {
  Icon: LucideIcon;
  ariaLabel: string;
  onClick?: () => void;
  color?: keyof Theme["fill"];
}

export const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  ariaLabel,
  onClick,
  color = "primary",
}) => {
  const theme = useTheme();
  return (
    <StyledButton aria-label={ariaLabel} onClick={onClick}>
      <Icon size={24} color={theme.fill[color]} />
    </StyledButton>
  );
};
