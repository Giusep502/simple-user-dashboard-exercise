import { users } from "../data";
import type { User } from "../types";

export const useUsersList = () => {
  const getUsers = () => {
    // await fetch(ENDPOINT_URL/users...
    // check if the response is ok
    // return await response.json()
    // Handle the errors

    return new Promise<User[]>((resolve) => {
      setTimeout(() => {
        resolve(users);
      }, 1000);
    });
  };

  return { getUsers };
};
