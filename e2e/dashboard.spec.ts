import { test, expect } from "@playwright/test";

test.describe("Users Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    /** Starts always in a clean state */
    await page.goto("http://localhost:5173/");
  });

  test("has title, filters and list", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Users Dashboard" }),
    ).toBeVisible();
    await expect(page.getByTestId("filters-container")).toBeVisible();
    await expect(page.getByTestId("users-list")).toBeVisible();
  });

  test("should filter by name", async ({ page }) => {
    await expect(page.getByTestId("users-list")).toBeVisible();
    const nameFilter = page.getByTestId("name-filter");
    await nameFilter.fill("John");
    await expect(page.getByTestId("users-list-row")).toHaveCount(0);
    await nameFilter.fill("Jo");
    await expect(page.getByTestId("users-list-row")).toHaveCount(3);
    await nameFilter.clear();
    await expect(page.getByTestId("users-list-row")).toHaveCount(20);
  });

  test("should filter by role", async ({ page }) => {
    await expect(page.getByTestId("users-list")).toBeVisible();
    const adminFilter = page.getByRole("checkbox", { name: "Admin" });
    const editorFilter = page.getByRole("checkbox", { name: "Editor" });
    const viewerFilter = page.getByRole("checkbox", { name: "Viewer" });
    await adminFilter.click();
    await expect(page.getByText("Olivia Moore")).not.toBeVisible();
    await expect(page.getByText("Ethan Hunt")).toBeVisible();
    await expect(page.getByText("Liam Scott")).not.toBeVisible();
    await editorFilter.click();
    await expect(page.getByText("Olivia Moore")).toBeVisible();
    await expect(page.getByText("Ethan Hunt")).toBeVisible();
    await expect(page.getByText("Liam Scott")).not.toBeVisible();
    await adminFilter.click();
    await viewerFilter.click();
    await expect(page.getByText("Olivia Moore")).toBeVisible();
    await expect(page.getByText("Ethan Hunt")).not.toBeVisible();
    await expect(page.getByText("Liam Scott")).toBeVisible();
  });

  test("should filter by name and role", async ({ page }) => {
    await expect(page.getByTestId("users-list")).toBeVisible();
    const editorFilter = page.getByRole("checkbox", { name: "Editor" });
    const nameFilter = page.getByTestId("name-filter");
    await editorFilter.click();
    await nameFilter.fill("So");
    await expect(page.getByText("Penelope Watson")).toBeVisible();
    await expect(page.getByText("Sophia Clarke")).not.toBeVisible();
    await expect(page.getByText("Olivia Moore")).not.toBeVisible();
  });

  test("should open user profile", async ({ page }) => {
    await expect(page.getByTestId("users-list")).toBeVisible();
    await page.getByText("Ethan Hunt").click();
    const userDialog = page.getByRole("dialog");
    await expect(userDialog).toBeVisible();
    await expect(userDialog.getByText("ethan.hunt@fakecorp.com")).toBeVisible();
    await expect(userDialog.getByText("Admin")).toBeVisible();
    await expect(userDialog.getByText("Active")).toBeVisible();
    await expect(userDialog.getByText("1")).toBeVisible();
  });
});
