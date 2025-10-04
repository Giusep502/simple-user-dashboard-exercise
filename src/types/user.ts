// TODO: Create multiple files if types will be a lot

export type Role = "Admin" | "Editor" | "Viewer";

export interface User {
  name: string;
  role: Role;
  email: string;
  id: number;
  status: "active" | "inactive";
  profile_picture_url?: string;
}
