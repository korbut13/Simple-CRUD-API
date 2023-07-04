import http from 'node:http';

import { dataBase } from "../dataBase";
import { getSelectedUser } from '../utils/getUser';

export const makeGetRequestWithId = (userId: string, response: http.ServerResponse) => {
  try {
    console.log('hello', userId);
    if (dataBase.has(userId)) {
      response.statusCode = 200;
      response.end(JSON.stringify(getSelectedUser(dataBase, userId)));
    } else {
      response.statusCode = 400;
      response.end('The user with this id was not found');
    }
  } catch (err) {
    response.statusCode = 404;
    response.end('Record with doesn\'t exist');
  }
}
