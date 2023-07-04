import http from 'node:http';

import { dataBase } from "../dataBase";
import { getUsers } from '../utils/getUsers';

export const makeGetRequest = (response: http.ServerResponse) => {
  try {
    response.statusCode = 200;
    const users = getUsers(dataBase);
    response.end(JSON.stringify(users));
  } catch (err) {
    response.statusCode = 404;
    response.end('Record with doesn\'t exist');
  }
}
