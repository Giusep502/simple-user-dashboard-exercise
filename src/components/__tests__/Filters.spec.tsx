import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Filters } from "../Filters";
import { renderWithProviders } from "./utils";
import { users } from "./mocks";
import { UsersListContext } from "../../providers/Contexts";
import type { Filter } from "../../types";

const mockSetFilters = vi.fn((valueOrFunction) => {
  if (typeof valueOrFunction === "function") {
    return valueOrFunction([]);
  }
  return valueOrFunction;
});

const MockedUsersListProvider = ({
  children,
  setFilters,
  currentFilters,
}: {
  children: React.ReactNode;
  setFilters?: typeof mockSetFilters;
  currentFilters?: Filter[];
}) => {
  return (
    <UsersListContext.Provider
      value={{
        users: users,
        filteredUsers: users,
        filters: currentFilters ?? [],
        status: "loaded" as const,
        setFilters: setFilters ?? mockSetFilters,
      }}
    >
      {children}
    </UsersListContext.Provider>
  );
};

describe("Filters", () => {
  it("should display the filters and the data", () => {
    renderWithProviders(
      <MockedUsersListProvider>
        <Filters />
      </MockedUsersListProvider>,
    );
    screen.getByLabelText("Admin").click();
    expect(screen.getByLabelText("Admin")).toBeDefined();
    expect(screen.getByLabelText("Editor")).toBeDefined();
    expect(screen.getByLabelText("Viewer")).toBeDefined();
    expect(screen.getByLabelText("Search by Name")).toBeDefined();
    expect(screen.getByText("Showing 100 of 100 users")).toBeDefined();
    expect(screen.getByText("Clear Filters")).toBeDefined();
  });

  it("should call the setFilters function properly for role filters", () => {
    renderWithProviders(
      <MockedUsersListProvider>
        <Filters />
      </MockedUsersListProvider>,
    );
    screen.getByLabelText("Admin").click();
    expect(mockSetFilters).toHaveLastReturnedWith([
      { type: "role", value: ["Admin"] },
    ]);
    screen.getByLabelText("Editor").click();
    expect(mockSetFilters).toHaveLastReturnedWith([
      { type: "role", value: ["Editor"] },
    ]);
    screen.getByLabelText("Viewer").click();
    expect(mockSetFilters).toHaveLastReturnedWith([
      { type: "role", value: ["Viewer"] },
    ]);
  });

  it("should search by name properly", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <MockedUsersListProvider>
        <Filters />
      </MockedUsersListProvider>,
    );

    const searchInput = screen.getByLabelText("Search by Name");

    await user.type(searchInput, "John");
    expect(mockSetFilters).toHaveLastReturnedWith([
      { type: "name", value: "John" },
    ]);

    await user.clear(searchInput);
    expect(mockSetFilters).toHaveLastReturnedWith([]);
  });

  it("should search by name properly with other filters", async () => {
    const user = userEvent.setup();
    const oldFilters = [{ type: "role", value: ["Admin"] }] as Filter[];
    const setFiltersWithRole = vi.fn((valueOrFunction) => {
      if (typeof valueOrFunction === "function") {
        return valueOrFunction([...oldFilters]);
      }
      return valueOrFunction;
    });

    renderWithProviders(
      <MockedUsersListProvider
        currentFilters={oldFilters}
        setFilters={setFiltersWithRole}
      >
        <Filters />
      </MockedUsersListProvider>,
    );

    const searchInput = screen.getByLabelText("Search by Name");

    await user.type(searchInput, "John");
    expect(setFiltersWithRole).toHaveLastReturnedWith([
      { type: "role", value: ["Admin"] },
      { type: "name", value: "John" },
    ]);

    await user.clear(searchInput);
    expect(setFiltersWithRole).toHaveLastReturnedWith([
      { type: "role", value: ["Admin"] },
    ]);
  });

  it("adds filter by role when there is already a filter by name", async () => {
    const oldFilters = [{ type: "name", value: "John" }] as Filter[];
    const setFiltersWithName = vi.fn((valueOrFunction) => {
      if (typeof valueOrFunction === "function") {
        return valueOrFunction(oldFilters);
      }
      return valueOrFunction;
    });

    renderWithProviders(
      <MockedUsersListProvider
        setFilters={setFiltersWithName}
        currentFilters={oldFilters}
      >
        <Filters />
      </MockedUsersListProvider>,
    );

    screen.getByLabelText("Editor").click();
    expect(setFiltersWithName).toHaveLastReturnedWith([
      oldFilters[0],
      { type: "role", value: ["Editor"] },
    ]);
  });
  it("adds filter by role when there is another role filter", async () => {
    const oldFilters = [{ type: "role", value: ["Admin"] }] as Filter[];
    const setFiltersWithRole = vi.fn((valueOrFunction) => {
      if (typeof valueOrFunction === "function") {
        return valueOrFunction(oldFilters);
      }
      return valueOrFunction;
    });

    renderWithProviders(
      <MockedUsersListProvider
        setFilters={setFiltersWithRole}
        currentFilters={oldFilters}
      >
        <Filters />
      </MockedUsersListProvider>,
    );

    screen.getByLabelText("Editor").click();
    expect(setFiltersWithRole).toHaveLastReturnedWith([
      { type: "role", value: ["Admin", "Editor"] },
    ]);
  });
  it("removes filter by role when the filter is active", async () => {
    const oldFilters = [
      { type: "role", value: ["Admin", "Editor"] },
    ] as Filter[];
    const setFiltersWithRole = vi.fn((valueOrFunction) => {
      if (typeof valueOrFunction === "function") {
        return valueOrFunction(oldFilters);
      }
      return valueOrFunction;
    });

    renderWithProviders(
      <MockedUsersListProvider
        setFilters={setFiltersWithRole}
        currentFilters={oldFilters}
      >
        <Filters />
      </MockedUsersListProvider>,
    );

    screen.getByLabelText("Admin").click();
    expect(setFiltersWithRole).toHaveLastReturnedWith([
      { type: "role", value: ["Editor"] },
    ]);
  });

  it("removes filter by role when only that filter is active", async () => {
    const oldFilters = [{ type: "role", value: ["Admin"] }] as Filter[];
    const setFiltersWithRole = vi.fn((valueOrFunction) => {
      if (typeof valueOrFunction === "function") {
        return valueOrFunction(oldFilters);
      }
      return valueOrFunction;
    });

    renderWithProviders(
      <MockedUsersListProvider
        setFilters={setFiltersWithRole}
        currentFilters={oldFilters}
      >
        <Filters />
      </MockedUsersListProvider>,
    );

    screen.getByLabelText("Admin").click();
    expect(setFiltersWithRole).toHaveLastReturnedWith([]);
  });

  it("keeps other filters when removing a filter by role", async () => {
    const oldFilters = [
      { type: "role", value: ["Admin"] },
      { type: "name", value: "John" },
    ] as Filter[];
    const setFiltersWithRole = vi.fn((valueOrFunction) => {
      if (typeof valueOrFunction === "function") {
        return valueOrFunction(oldFilters);
      }
      return valueOrFunction;
    });

    renderWithProviders(
      <MockedUsersListProvider
        setFilters={setFiltersWithRole}
        currentFilters={oldFilters}
      >
        <Filters />
      </MockedUsersListProvider>,
    );

    screen.getByLabelText("Admin").click();
    expect(setFiltersWithRole).toHaveLastReturnedWith([
      { type: "name", value: "John" },
    ]);
  });
});
