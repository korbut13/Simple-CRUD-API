import http from 'node:http';

import { dataBase } from "../dataBase";
import { isInstanceUser } from '../utils/isInstanceUser';

export const makePutRequest = (userId: string | null | undefined, response: http.ServerResponse, request: http.IncomingMessage) => {
  try {
    if (userId) {
      if (dataBase.has(userId)) {
        let body = '';
        request.on('data', (chunk) => {
          body += chunk;
        });
        request.on('end', () => {
          const updatedUser = JSON.parse(body);
          if (!isInstanceUser(updatedUser)) {
            response.statusCode = 400;
            response.end('Body does not contain required fields');
          } else {
            dataBase.set(userId!, updatedUser);
            response.statusCode = 200;
            response.end('Record updated');
          };
        });
      } else {
        response.statusCode = 400;
        response.end('UserId is invalid');
      }
    } else {
      response.statusCode = 404;
      response.end('Record with doesn\'t exist');
    }
  } catch (err) {
    response.statusCode = 404;
    response.end('Record with doesn\'t exist');
  }
}
