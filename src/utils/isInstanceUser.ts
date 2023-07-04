export const isInstanceUser = (obj: {
  username?: string,
  age?: number,
  hobbies?: string[],
}) => {

  const defaultProps = ['username', 'age', 'hobbies'];
  const objProps = Object.keys(obj);

  if (defaultProps.length !== objProps.length) return false;
  const filtredProps = defaultProps.filter((elem) => objProps.includes(elem));
  return filtredProps.length !== objProps.length ? false : typeof obj.hobbies !== 'object' ? false : true;
}
