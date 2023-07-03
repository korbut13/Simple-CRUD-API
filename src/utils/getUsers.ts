import { User } from "./types";

export const getUsers = (dataBase: Map<string, User>) => {
  const users = [];

  for (let entry of dataBase) {
    const parseUser = {
      id: entry[0],
      username: entry[1].username,
      age: entry[1].age,
      hobbies: entry[1].hobbies,
    }
    users.push(parseUser);
  }
  return users
}
