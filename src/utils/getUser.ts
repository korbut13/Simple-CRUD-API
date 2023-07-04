import { User } from "./types";

export const getSelectedUser = (dataBase: Map<string, User>, id: string) => {
  const selectedUser = dataBase.get(id);
  const resp = {
    id: id,
    ...selectedUser,
  }
  return resp;
}
