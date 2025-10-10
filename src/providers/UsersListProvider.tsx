import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { User, Filter, Status } from "../types";
import { useUsersList } from "../hooks";
import { UsersListContext } from "./Contexts";
import { useSearchParams } from "react-router-dom";

/** TODO: Refactor Component */
/** TODO: Refactor navigation to use proper routes */

const PAGE_SIZE = 20;

export const UsersListProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [filters, setFilters] = useState<Filter[]>([]);
  const [allUsersLoaded, setAllUsersLoaded] = useState(false);
  const [searchParams, setUrlSearchParams] = useSearchParams();

  // Simulate pagination from Backend
  const [nLoadedUsers, setNLoadedUsers] = useState(0);

  const { getUsers } = useUsersList();

  const selectedUser = useMemo(() => {
    if (status !== "loaded") return undefined;
    const selectedUserId = searchParams.get("id");
    return selectedUserId
      ? users.find((user) => user.id === parseInt(selectedUserId))
      : undefined;
  }, [searchParams, status, users]);

  const initUsers = async () => {
    if (status !== "idle") return;

    setStatus("loading");
    const resultUsers = await getUsers();
    if (!resultUsers) {
      setStatus("error");
      return;
    }
    setUsers(resultUsers);
    setStatus("loaded");
  };

  const filteredUsers = useMemo(() => {
    if (filters.length === 0) return users;
    return users.filter((user) => {
      return filters.every((filter) => {
        if (filter.type === "role") {
          return filter.value.includes(user.role);
        }
        if (filter.type === "name") {
          return user.name.toLowerCase().includes(filter.value.toLowerCase());
        }
      });
    });
  }, [users, filters]);

  useEffect(() => {
    initUsers();
    // Avoid useless useCallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setNLoadedUsers(Math.min(filteredUsers.length, PAGE_SIZE));
    setAllUsersLoaded(filteredUsers.length <= PAGE_SIZE); // Should come from Backend
  }, [filteredUsers]);

  const setUser = (user?: User) => {
    if (user) {
      setUrlSearchParams({ id: user.id.toString() });
    } else {
      setUrlSearchParams({});
    }
  };

  const loadMore = useCallback(
    () =>
      new Promise<void>((resolve) => {
        // Simulate load more from backend

        // Check if we have more users to load if backend pagination is implemented
        if (nLoadedUsers >= filteredUsers.length) {
          setAllUsersLoaded(true);
          resolve();
          return;
        }

        // Simulate backend response delay and userLoaded data
        setTimeout(() => {
          const loadedUsers = Math.min(
            nLoadedUsers + PAGE_SIZE,
            filteredUsers.length,
          );
          setNLoadedUsers(loadedUsers);
          setAllUsersLoaded(loadedUsers >= filteredUsers.length);
          resolve();
        }, 200);
      }),
    [filteredUsers, nLoadedUsers],
  );

  return (
    <UsersListContext
      value={{
        users,
        allFilteredUsersNumber: filteredUsers.length, // Should come from Backend
        filteredUsers: filteredUsers.slice(0, nLoadedUsers), // Simulate pagination from backend
        filters,
        status,
        setFilters,
        setSelectedUser: setUser,
        selectedUser,
        loadMore,
        allUsersLoaded,
      }}
    >
      {children}
    </UsersListContext>
  );
};
