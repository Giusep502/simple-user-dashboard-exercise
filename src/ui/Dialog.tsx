import * as RadixDialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type { PropsWithChildren } from "react";
import styled from "styled-components";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ariaTitle: string;
}

const StyledOverlay = styled(RadixDialog.Overlay)`
  background: rgba(0 0 0 / 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledContent = styled(RadixDialog.Content)`
  background-color: ${({ theme }) => theme.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
`;

export const Dialog: React.FC<PropsWithChildren<DialogProps>> = ({
  children,
  open,
  onOpenChange,
  ariaTitle,
}) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <StyledOverlay>
          <VisuallyHidden>
            <RadixDialog.Title>{ariaTitle}</RadixDialog.Title>
          </VisuallyHidden>
          <StyledContent aria-describedby={undefined}>{children}</StyledContent>
        </StyledOverlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
