export type Role = "Admin" | "Editor" | "Viewer";

export interface User {
  name: string;
  role: Role;
}
