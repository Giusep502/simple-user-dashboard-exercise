import { useContext } from "react";
import { X } from "lucide-react";
import styled, { useTheme } from "styled-components";
import { UserDialog, Filters, UsersList } from "../components";
import { Spinner } from "../ui";
import { UsersListContext } from "../providers";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ErrorDiv = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const UsersListPage = () => {
  const { status } = useContext(UsersListContext);
  const theme = useTheme();

  if (status === "idle") {
    return null;
  }

  if (status === "loading") {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  if (status === "error") {
    return (
      <ErrorDiv>
        <X size={24} color={theme.fill.error} /> Error fetching users. Refresh
        the page to try again."
      </ErrorDiv>
    );
  }

  return (
    <>
      <UserDialog />
      <Filters />
      <UsersList />
    </>
  );
};
