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

const PAGE_SIZE = 20;

export const UsersListProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [filters, setFilters] = useState<Filter[]>([]);

  // Simulate pagination from Backend
  const [nLoadedUsers, setNLoadedUsers] = useState(0);

  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const { getUsers } = useUsersList();

  const getUserFromQueryParam = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const selectedUserId = queryParams.get("id");
    return selectedUserId ? parseInt(selectedUserId) : undefined;
  };

  const initUsers = async () => {
    if (status !== "idle") return;

    setStatus("loading");
    const resultUsers = await getUsers();
    if (!resultUsers) {
      setStatus("error");
      return;
    }
    setUsers(resultUsers);
    const selectedUserId = getUserFromQueryParam();
    if (selectedUserId) {
      setSelectedUser(resultUsers.find((user) => user.id === selectedUserId));
    }
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
  }, [filteredUsers]);

  const setUser = (user?: User) => {
    setSelectedUser(user);
    if (user) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("id", user.id.toString());
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${queryParams.toString()}`,
      );
    } else {
      window.history.pushState({}, "", `${window.location.pathname}`);
    }
  };

  const loadMore = useCallback(
    () =>
      new Promise<void>((resolve) => {
        // Simulate load more from backend

        // Check if we have more users to load if backend pagination is implemented
        if (nLoadedUsers >= filteredUsers.length) return;

        // Simulate backend response delay
        setTimeout(() => {
          setNLoadedUsers(
            Math.min(nLoadedUsers + PAGE_SIZE, filteredUsers.length),
          );
          resolve();
        }, 200);
      }),
    [filteredUsers, nLoadedUsers],
  );

  return (
    <UsersListContext
      value={{
        users,
        filteredUsers: filteredUsers.slice(0, nLoadedUsers), // Simulate pagination from backend
        filters,
        status,
        setFilters,
        setSelectedUser: setUser,
        selectedUser,
        loadMore,
      }}
    >
      {children}
    </UsersListContext>
  );
};
