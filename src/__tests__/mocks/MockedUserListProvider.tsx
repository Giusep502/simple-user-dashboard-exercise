import { UsersListContext } from "../../providers";
import { users } from "./users";
import type { Filter } from "../../types";
import { type Mock } from "vitest";
import type { User } from "../../types";

export const MockedUsersListProvider = ({
  children,
  setFilters,
  currentFilters,
  selectedUser,
  setSelectedUser,
}: {
  children: React.ReactNode;
  setFilters?: Mock<(valueOrFunction: unknown) => unknown>;
  currentFilters?: Filter[];
  selectedUser?: User;
  setSelectedUser?: Mock<(user?: User) => void>;
}) => {
  return (
    <UsersListContext.Provider
      value={{
        users: users,
        filteredUsers: users,
        filters: currentFilters ?? [],
        status: "loaded" as const,
        setFilters: setFilters ?? (() => {}),
        setSelectedUser: setSelectedUser ?? (() => {}),
        selectedUser: selectedUser,
      }}
    >
      {children}
    </UsersListContext.Provider>
  );
};
