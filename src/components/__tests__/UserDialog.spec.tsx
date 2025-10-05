import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { UserDialog } from "../UserDialog";
import { users } from "./mocks";
import { renderWithProviders } from "./utils";
import profilePic from "../../assets/profilePic.jpg";

describe("UserDialog", () => {
  it("should display user's text details", () => {
    renderWithProviders(
      <UserDialog selectedUser={users[0]} setSelectedUser={() => {}} />,
    );
    expect(screen.getByText(users[0].name)).toBeDefined();
    expect(screen.getByText(users[0].id)).toBeDefined();
    expect(screen.getByText(users[0].role)).toBeDefined();
    expect(screen.getByText(users[0].status)).toBeDefined();
  });
  it("should display a placeholder image when user has no profile picture", () => {
    renderWithProviders(
      <UserDialog selectedUser={users[0]} setSelectedUser={() => {}} />,
    );
    expect(
      screen.getByAltText(`${users[0].name}'s profile picture`),
    ).toBeDefined();
    const image = screen.getByAltText(`${users[0].name}'s profile picture`);
    expect(image).toBeDefined();
    expect(image).toHaveProperty("src", window.location.origin + profilePic);
  });
  it("should display user'sprofile picture", () => {
    renderWithProviders(
      <UserDialog selectedUser={users[1]} setSelectedUser={() => {}} />,
    );
    const image = screen.getByAltText(`${users[1].name}'s profile picture`);
    expect(image).toBeDefined();
    expect(image).toHaveProperty("src", users[1].profile_picture_url);
  });
});
