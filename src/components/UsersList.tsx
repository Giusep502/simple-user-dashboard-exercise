import { useContext } from "react";
import { UsersListContext } from "../providers";
import type { User } from "../types";
import { Dialog } from "../ui";
import { useState } from "react";

export const UsersList = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { users, status } = useContext(UsersListContext);

  console.log(selectedUser);

  if (status === "idle") {
    return null;
  }
  if (status === "loading") {
    return "Loading";
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedUser(null);
    }
  };

  return (
    <>
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
      {users.map((user, index) => (
        <div key={user.id} onClick={() => setSelectedUser(user)}>
          <div>{user.name}</div>
          <div>{user.role}</div>
          <div>
            {index + 1} of {users.length}
          </div>
        </div>
      ))}
    </>
  );
};
