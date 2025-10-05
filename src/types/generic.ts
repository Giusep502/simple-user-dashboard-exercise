import type { Role } from "./user";

export type Filter =
  | {
      type: "role";
      value: Role[];
    }
  | {
      type: "name";
      value: string;
    };

export type Status = "idle" | "loading" | "loaded";
