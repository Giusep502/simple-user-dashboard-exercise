import React, {
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { User, Filter, Status } from "../types";
import { useUsersList } from "../hooks";
import { UsersListContext } from "./Contexts";

export const UsersListProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [filters, setFilters] = useState<Filter[]>([]);
  const { getUsers } = useUsersList();

  const initUsers = async () => {
    setStatus("loading");
    const resultUsers = await getUsers();
    setUsers(resultUsers);
    setStatus("loaded");
  };

  const filteredUsers = useMemo(() => users, [users]);

  useEffect(() => {
    initUsers();
    // Avoid useless useCallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UsersListContext
      value={{
        users,
        filteredUsers,
        filters,
        status,
        setFilters,
      }}
    >
      {children}
    </UsersListContext>
  );
};
