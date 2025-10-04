import React, { createContext } from "react";
import type { User, Filter, Status } from "../types";
import type { ThemeMode } from "../ui";

interface IUsersListContext {
  users: User[];
  filteredUsers: User[];
  filters: Filter[];
  status: Status;
  setFilters: (filters: Filter[]) => void;
}

const defaultUserListValues = {
  users: [],
  filteredUsers: [],
  filters: [],
  status: "idle",
  setFilters: () => {},
} as const as IUsersListContext;

export const UsersListContext: React.Context<IUsersListContext> = createContext(
  defaultUserListValues,
);

interface IThemeContext {
  currentMode: ThemeMode;
  setMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}

const defaultTheme = {
  currentMode: "light",
  setMode: (prev) => prev,
} as const as IThemeContext;

export const ThemeContext: React.Context<IThemeContext> =
  createContext(defaultTheme);
