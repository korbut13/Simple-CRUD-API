
import url from 'url';

export const parseUrl = (reqUrl: string) => {
  const parsedUrl = url.parse(reqUrl as string, true);
  const path = parsedUrl.pathname;
  const arrOfPath = path!.split('/');
  const idUser = arrOfPath.length === 4 ? arrOfPath[3] : null;
  return {
    path: path,
    id: idUser
  }
}
