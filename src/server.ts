import http from 'node:http';
import 'dotenv/config';

import { controller } from './controller/controller';
import { parseUrl } from './utils/parseUrl';

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  const { method, url: requestUrl } = request;
  let path: string = '';
  let userId: string | null | undefined = null;

  if (requestUrl) {
    const paramsRequests = parseUrl(requestUrl);
    path = paramsRequests.path as string;
    userId = paramsRequests.id;
  }

  response.setHeader('Content-Type', 'application/json');

  if (path!.includes('/api/users')) {
    controller(method!, userId, response, request)
  } else {
    response.statusCode = 404;
    response.end('Record with doesn\'t exist');
  }
});

const host = 'localhost';
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
