import http from 'node:http';
import url from 'url';
import { v4 } from 'uuid';


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
        const newUser = JSON.parse(body);
        if (!('id' in newUser) || !('name' in newUser)) {
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
  } else if (path?.includes('/api/users') && idUser) {
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
          if (!('id' in updatedUser) || !('name' in updatedUser)) {
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

  }

});

const host = 'localhost';
const port = 3000;

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});

// const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
//   if (req.url === '/' && req.method === 'GET') {
//     // Обработка GET запроса на корневой URL
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Welcome to the homepage!');
//   } else if (req.url === '/users' && req.method === 'GET') {

//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');

//   } else if (req.url === '/users' && req.method === 'POST') {
//     // Обработка POST запроса на URL /users
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk;
//     });
//     req.on('end', () => {

//       const user = JSON.parse(body);
//       const worker = new Worker(dbPath, { workerData: { id: 55, userData: { age: 30, name: "sveta" } } });

//       res.statusCode = 201;
//       res.setHeader('Content-Type', 'application/json');
//       res.end(JSON.stringify({ message: 'Record created succsesfully' }))

//     });
//   } else {
//     // Обработка неизвестного URL или метода запроса
//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Not found');
//   }
// });

// const host = 'localhost';
// const port = 3000;

// server.listen(port, host, () => {
//   console.log(`Server running at http://${host}:${port}`);
// });
