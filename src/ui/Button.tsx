import styled from "styled-components";

const StyledButton = styled.button<{ $variant: "primary" | "secondary" }>`
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  transition: ease-in-out 0.1s;
  user-select: none;
  &:focus,
  &:focus-visible {
    outline: 2px solid;
  }
  &:disabled {
    cursor: pointer;
    opacity: 0.5;
    pointer-events: none;
  }
`;

const PrimaryButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.button.background.default};
  color: ${({ theme }) => theme.button.text};
  &:hover {
    background-color: ${({ theme }) => theme.button.background.hover};
  }
  &:focus,
  &:focus-visible {
    outline-color: ${({ theme }) => theme.button.outline};
  }
  &:active {
    background-color: ${({ theme }) => theme.button.background.pressed};
  }
`;

const SecondaryButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.secondaryButton.background.default};
  color: ${({ theme }) => theme.secondaryButton.text};
  &:hover {
    background-color: ${({ theme }) => theme.secondaryButton.background.hover};
  }
  &:focus,
  &:focus-visible {
    outline-color: ${({ theme }) => theme.secondaryButton.outline};
  }
  &:active {
    background-color: ${({ theme }) =>
      theme.secondaryButton.background.pressed};
  }
`;

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  variant = "primary",
}) => {
  const ButtonComponent =
    variant === "secondary" ? SecondaryButton : PrimaryButton;

  return (
    <ButtonComponent
      disabled={disabled}
      $variant={variant}
      aria-label={label}
      onClick={onClick}
    >
      {label}
    </ButtonComponent>
  );
};
