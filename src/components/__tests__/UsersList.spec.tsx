import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { users } from "./mocks";
import { renderWithProviders } from "./utils";
import { UsersList } from "../UsersList";

const mockOnSelectUser = vi.fn();

describe("UserDialog", () => {
  it("should display users details", () => {
    renderWithProviders(
      <UsersList users={users} onSelectUser={mockOnSelectUser} />,
    );
    expect(screen.getAllByText(users[0].name)).toBeDefined();
    expect(screen.getByText(users[1].email)).toBeDefined();
    expect(screen.getAllByText(users[2].role)).toBeDefined();
    expect(
      screen.getAllByLabelText(`View details of user: ${users[0].name}`),
    ).toBeDefined();
  });
  it("should set the selected user when a user is clicked", () => {
    renderWithProviders(
      <UsersList users={users} onSelectUser={mockOnSelectUser} />,
    );
    screen.getAllByText(users[0].name)[0].click();
    expect(mockOnSelectUser).toHaveBeenCalledWith(users[0]);

    screen
      .getAllByLabelText(`View details of user: ${users[1].name}`)[0]
      .click();
    expect(mockOnSelectUser).toHaveBeenCalledWith(users[1]);
  });
});
