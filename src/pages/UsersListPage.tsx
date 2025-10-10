import { useContext, useEffect, useRef } from "react";
import { X } from "lucide-react";
import styled, { useTheme } from "styled-components";
import { UserDialog, Filters, UsersList } from "../components";
import { Spinner } from "../ui";
import { UsersListContext } from "../providers";

const LOAD_MORE_THRESHOLD_PX = 200;

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

const ListPage = styled.div`
  position: relative;
  overflow: auto;
  flex-grow: 1;
`;

const ThresholdSquare = styled.div`
  width: 1px;
  height: 1px;
  margin-top: -${LOAD_MORE_THRESHOLD_PX}px;
  visibility: hidden;
`;

export const UsersListPage = () => {
  const { status, loadMore, allUsersLoaded } = useContext(UsersListContext);
  const theme = useTheme();
  const triggerVisibleElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerVisibleElement.current || status !== "loaded") return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      });
    });

    observer.observe(triggerVisibleElement.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMore, status]);

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
        the page to try again.
      </ErrorDiv>
    );
  }

  return (
    <ListPage>
      <UserDialog />
      <Filters />
      <UsersList />
      <ThresholdSquare ref={triggerVisibleElement} />
      {!allUsersLoaded && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </ListPage>
  );
};
