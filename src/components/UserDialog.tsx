import { Dialog } from "../ui";
import type { User } from "../types";
import styled from "styled-components";
import profilePic from "../assets/profilePic.jpg";

interface UserDialogProps {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
  min-width: 280px;
  max-width: 500px;
`;

const UserHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  padding-bottom: ${({ theme }) => theme.spacing.large};
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserName = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
`;

const UserRole = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  background: ${({ theme }) => theme.surface.default};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
`;

const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const StatusIndicator = styled.div<{ status: "active" | "inactive" }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme, status }) =>
    status === "active" ? theme.fill.success : theme.fill.inactive};
`;

const StatusText = styled.span<{ status: "active" | "inactive" }>`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, status }) =>
    status === "active" ? theme.fill.success : theme.fill.inactive};
  text-transform: capitalize;
`;

export const UserDialog = ({
  selectedUser,
  setSelectedUser,
}: UserDialogProps) => {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedUser(null);
    }
  };

  if (!selectedUser) return null;

  return (
    <Dialog
      open={selectedUser !== null}
      onOpenChange={onOpenChange}
      ariaTitle="User Details"
    >
      <UserProfileContainer>
        <UserHeader>
          <AvatarContainer>
            <AvatarImage
              src={selectedUser.profile_picture_url || profilePic}
              alt={`${selectedUser.name}'s profile picture`}
            />
          </AvatarContainer>

          <UserName>{selectedUser.name}</UserName>
          <UserRole>{selectedUser.role}</UserRole>
        </UserHeader>

        <UserDetails>
          <DetailRow>
            <DetailLabel>Email</DetailLabel>
            <DetailValue>{selectedUser.email}</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Status</DetailLabel>
            <StatusContainer>
              <StatusIndicator status={selectedUser.status} />
              <StatusText status={selectedUser.status}>
                {selectedUser.status}
              </StatusText>
            </StatusContainer>
          </DetailRow>

          <DetailRow>
            <DetailLabel>User ID</DetailLabel>
            <DetailValue>{selectedUser.id}</DetailValue>
          </DetailRow>
        </UserDetails>
      </UserProfileContainer>
    </Dialog>
  );
};
