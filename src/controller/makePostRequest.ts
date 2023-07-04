import http from 'node:http';
import { v4 } from 'uuid';

import { dataBase } from "../dataBase";
import { isInstanceUser } from '../utils/isInstanceUser';

import { User } from '../utils/types';

export const makePostRequest = (userId: string | null | undefined, response: http.ServerResponse, request: http.IncomingMessage) => {
  try {
    if (userId) {
      response.statusCode = 400;
      response.end('Invalid path');
    } else {
      let body = '';
      request.on('data', (chunk) => {
        body += chunk;
      });
      request.on('end', () => {
        const newUser: User = JSON.parse(body);
        if (!isInstanceUser(newUser)) {
          response.statusCode = 400;
          response.end('Body does not contain required fields');
        } else {
          const idUser = v4();
          dataBase.set(idUser, newUser);
          response.statusCode = 201;
          response.end('User created');
        }
      })
    }
  } catch (err) {
    response.statusCode = 404;
    response.end('Record with doesn\'t exist');
  }
}
