import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { UserDialog } from "../UserDialog";
import { users } from "./mocks";
import { renderWithProviders } from "./utils";
import profilePic from "../../assets/profilePic.jpg";
import { MockedUsersListProvider } from "./mocks";

describe("UserDialog", () => {
  it("should display user's text details", () => {
    renderWithProviders(
      <MockedUsersListProvider selectedUser={users[0]}>
        <UserDialog />
      </MockedUsersListProvider>,
    );
    expect(screen.getByText(users[0].name)).toBeDefined();
    expect(screen.getByText(users[0].id)).toBeDefined();
    expect(screen.getByText(users[0].email)).toBeDefined();
    expect(screen.getByText(users[0].role)).toBeDefined();
    expect(screen.getByText(users[0].status)).toBeDefined();
  });
  it("should display a placeholder image when user has no profile picture", () => {
    renderWithProviders(
      <MockedUsersListProvider selectedUser={users[0]}>
        <UserDialog />,
      </MockedUsersListProvider>,
    );
    expect(
      screen.getByAltText(`${users[0].name}'s profile picture`),
    ).toBeDefined();
    const image = screen.getByAltText(`${users[0].name}'s profile picture`);
    expect(image).toBeDefined();
    expect(image).toHaveProperty("src", window.location.origin + profilePic);
  });
  it("should display user's profile picture", () => {
    renderWithProviders(
      <MockedUsersListProvider selectedUser={users[1]}>
        <UserDialog />
      </MockedUsersListProvider>,
    );
    const image = screen.getByAltText(`${users[1].name}'s profile picture`);
    expect(image).toBeDefined();
    expect(image).toHaveProperty("src", users[1].profile_picture_url);
  });

  it("should close when the close button is clicked", () => {
    const setSelectedUser = vi.fn();
    renderWithProviders(
      <MockedUsersListProvider
        selectedUser={users[1]}
        setSelectedUser={setSelectedUser}
      >
        <UserDialog />
      </MockedUsersListProvider>,
    );
    const closeButton = screen.getByLabelText("Close dialog");
    expect(closeButton).toBeDefined();
    closeButton.click();
    expect(setSelectedUser).toHaveBeenCalledWith(undefined);
  });
});
