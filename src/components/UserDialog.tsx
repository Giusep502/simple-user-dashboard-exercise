import { Dialog } from "../ui";
import type { User } from "../types";

interface UserDialogProps {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserDialog = ({
  selectedUser,
  setSelectedUser,
}: UserDialogProps) => {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedUser(null);
    }
  };

  return (
    <Dialog
      open={selectedUser !== null}
      onOpenChange={onOpenChange}
      ariaTitle="User Details"
    >
      <div>{selectedUser?.name}</div>
      <div>{selectedUser?.role}</div>
      <div>{selectedUser?.email}</div>
      <div>{selectedUser?.status}</div>
      <div>{selectedUser?.profile_picture_url}</div>
    </Dialog>
  );
};
