import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "../../__tests__/utils";
import { UsersListProvider } from "../UsersListProvider";
import { users } from "../../__tests__/mocks";
import { useContext, useEffect } from "react";
import { UsersListContext } from "../Contexts";
import type { User } from "../../types";

const getUsers = vi.fn().mockResolvedValue(users);

vi.mock("../../hooks/useUsersList", () => ({
  useUsersList: () => ({
    getUsers,
  }),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let contextValues: any;

const DisplayProviderValues = () => {
  const context = useContext(UsersListContext);

  useEffect(() => {
    contextValues = context;
  }, [context]);

  return null;
};

describe("UserListProvider", () => {
  it("should load the users", async () => {
    renderWithProviders(
      <UsersListProvider>
        <DisplayProviderValues />
      </UsersListProvider>,
    );
    await vi.waitFor(() => {
      expect(getUsers).toHaveResolved();
    });

    expect(contextValues?.filteredUsers.length).toBe(100);
    expect(contextValues?.filters.length).toBe(0);
    expect(contextValues?.status).toBe("loaded");
  });
  it("should filter the users correctly", async () => {
    renderWithProviders(
      <UsersListProvider>
        <DisplayProviderValues />
      </UsersListProvider>,
    );
    await vi.waitFor(() => {
      expect(contextValues?.status).toBe("loaded");
    });
    contextValues.setFilters([{ type: "role", value: ["Viewer"] }]);
    await vi.waitFor(() => {
      expect(contextValues?.filteredUsers).toEqual(
        users.filter((user: User) => user.role === "Viewer"),
      );
    });
    contextValues.setFilters([{ type: "role", value: ["Admin"] }]);
    await vi.waitFor(() => {
      expect(contextValues?.filteredUsers).toEqual(
        users.filter((user: User) => user.role === "Admin"),
      );
    });
    contextValues.setFilters([{ type: "role", value: ["Editor", "Admin"] }]);
    await vi.waitFor(() => {
      expect(contextValues?.filteredUsers).toEqual(
        users.filter(
          (user: User) => user.role === "Editor" || user.role === "Admin",
        ),
      );
    });
    contextValues.setFilters([{ type: "name", value: "Ethan" }]);
    await vi.waitFor(() => {
      expect(contextValues?.filteredUsers).toEqual(users.slice(0, 1));
    });
    contextValues.setFilters([
      { type: "name", value: "Ethan" },
      { type: "role", value: ["Admin"] },
    ]);
    await vi.waitFor(() => {
      expect(contextValues?.filteredUsers).toEqual(users.slice(0, 1));
    });
  });
});
