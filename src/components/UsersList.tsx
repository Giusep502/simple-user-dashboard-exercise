import { useContext } from "react";
import { UsersListContext } from "../providers";

export const UsersList = () => {
  const { users, status } = useContext(UsersListContext);
  if (status === "idle") {
    return null;
  }
  if (status === "loading") {
    return "Loading";
  }
  return users.map((user, index) => (
    <div>
      <div>{user.name}</div>
      <div>{user.role}</div>
      <div>
        {index + 1} of {users.length}
      </div>
    </div>
  ));
};
