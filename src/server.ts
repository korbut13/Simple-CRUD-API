import http from 'node:http';
import url from 'url';
import { v4 } from 'uuid';

import { User } from './utils/types';
import { isInstanceUser } from './utils/isInstanceUser';
import { dataBase } from './dataBase';

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  const { method, url: requestUrl } = request;
  const parsedUrl = url.parse(requestUrl as string, true);
  const path = parsedUrl.pathname;
  const arrOfPath = path!.split('/');
  const idUser = arrOfPath.length === 4 ? arrOfPath[3] : null;

  response.setHeader('Content-Type', 'application/json');
  if (path === '/api/users') {
    if (method === 'POST') {
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
          response.end('Record created');
        }
      });
    } else if (method === 'GET') {
      response.statusCode = 200;
      const objResp = Object.fromEntries(Array.from(dataBase));
      response.end(JSON.stringify(objResp));
    }
  } else if (path!.includes('/api/users') && idUser) {
    if (method === 'GET') {
      if (dataBase.has(idUser)) {
        response.statusCode = 200;
        response.end(JSON.stringify(dataBase.get(idUser)));
      } else {
        response.statusCode = 400;
        response.end('The user with this id was not found');
      }
    } else if (method === 'PUT') {
      if (dataBase.has(idUser)) {
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
            dataBase.set(idUser, updatedUser);
            response.statusCode = 200;
            response.end('Record updated');
          }
        });
      } else {
        response.statusCode = 400;
        response.end('UserId is invalid');
      }
    } else if (method === 'DELETE') {
      if (dataBase.has(idUser)) {
        dataBase.delete(idUser);
        response.statusCode = 204;
        response.end('Record is found and deleted');
      } else {
        response.statusCode = 400;
        response.end('UserId is invalid');
      }
    }
  } else {
    response.statusCode = 404;
    response.end('Record with doesn\'t exist');
  }
});
const host = 'localhost';
const port = 3000;

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
