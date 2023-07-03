import http from 'node:http';

import { makeGetRequest } from './makeGetRequest';
import { makeGetRequestWithId } from './makeGetRequestWithId';
import { makePutRequest } from './makePutRequest';
import { makeDeleteRequest } from './makeDeleteRequest';
import { makePostRequest } from './makePostRequest';


export const controller = (method: string, userId: string | null | undefined, response: http.ServerResponse, request: http.IncomingMessage) => {
  try {
    if (method === 'GET') {
      if (userId !== null) {
        console.log(111);
        makeGetRequestWithId(userId!, response);
      } else {
        makeGetRequest(response);
      }
    } else if (method === 'POST') {
      makePostRequest(userId, response, request)
    } else if (method === 'PUT') {
      makePutRequest(userId, response, request)
    } else if (method === 'DELETE') {
      makeDeleteRequest(userId, response)
    }
    // switch (method) {
    //   case 'GET':
    //     makeGetRequest(userId, response);
    //     break;
    //   case 'POST':
    //     makePostRequest(userId, response, request)
    //     break;
    //   case 'PUT':
    //     makePutRequest(userId, response, request)
    //     break;
    //   case 'DELETE':
    //     makeDeleteRequest(userId, response)
    //     break;
    // }
  } catch (err: unknown) {
    console.error(err);
  }
}
