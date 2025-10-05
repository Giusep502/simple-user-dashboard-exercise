import type { User } from "../types";
import { logger } from "../utils";

const USERS_API_URL = "https://api.jsonbin.io/v3/b/68e2798c43b1c97be95b2700";

export const useUsersList = () => {
  const getUsers = async () => {
    try {
      // TODO: Refactor API URL to use ENV when having staging and production environments
      // TODO: abstract API calls to a custom hook
      const response = await fetch(USERS_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const { record } = await response.json();
      return record as User[];
    } catch (error) {
      logger.error(String(error));
      return false;
    }
  };

  return { getUsers };
};
