import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.button.background.default};
  color: ${({ theme }) => theme.button.text};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  transition: ease-in-out 0.1s;
  &:hover {
    background-color: ${({ theme }) => theme.button.background.hover};
  }
  &:focus,
  &:focus-visible {
    outline: 2px solid;
    outline-color: ${({ theme }) => theme.button.outline};
  }
  &:active {
    background-color: ${({ theme }) => theme.button.background.pressed};
  }
`;

export const Button: React.FC<{ label: string; onClick: () => void }> = ({
  label,
  onClick,
}) => {
  return (
    <StyledButton aria-label={label} onClick={onClick}>
      {label}
    </StyledButton>
  );
};
