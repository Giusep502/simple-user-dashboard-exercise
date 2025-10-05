import { LoaderCircle } from "lucide-react";
import styled, { keyframes, useTheme } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled(LoaderCircle)`
  animation: ${spin} 1s ease-in-out infinite;
`;

export const Spinner = () => {
  const theme = useTheme();
  return <StyledSpinner size={32} color={theme.fill.primary} />;
};
