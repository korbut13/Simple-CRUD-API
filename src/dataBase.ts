// import { workerData, parentPort } from 'node:worker_threads';

// const dataBase = new Map();
// dataBase.set('user1', {
//   id: 1,
//   name: 'Sveta'
// });

// const workWithDataBase = () => {
//   dataBase.set(workerData.id, workerData.userData);
//   parentPort.postMessage(dataBase);
// };

export const dataBase = new Map();

dataBase.set('7c2847e1c32fa29fc1bbca873bd787fb', {
  id: '5',
  name: 'Sveta'
});
