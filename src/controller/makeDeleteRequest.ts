import http from 'node:http';

import { dataBase } from "../dataBase";

export const makeDeleteRequest = (userId: string | null | undefined, response: http.ServerResponse) => {
  try {
    if (userId) {
      if (dataBase.has(userId)) {

        dataBase.delete(userId);
        response.statusCode = 204;
        response.end('Record is found and deleted');

      } else {
        response.statusCode = 400;
        response.end('UserId is invalid');
      }
    } else {
      response.statusCode = 404;
      response.end('Record with doesn\'t exist');
    }
  } catch (err) {
    response.statusCode = 500;
    response.end('Error on the server side');
  }
}
