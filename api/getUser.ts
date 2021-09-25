import axios from 'axios';
import toCamelCaseKeys from '../utils/toCamelCaseKeys';

export type User = {
  access: number;
  accessMenu: number;
  carNumber: string;
  descr: string;
  disabled: number;
  idHouse: number;
  idUsers: number;
  isDelete: number;
  login: string;
  nameHouse: string;
  phone: string;
  pinkod: string;
  room: number;
};

const getUser = async ({ token }: { token: string }): Promise<User> => {
  const { data } = await axios.post('https://interlock.pp.ua/api/ios.php', {
    cmd: 'user_get_key',
    token,
  });

  if (typeof data !== 'object') {
    throw new Error();
  }

  const res = toCamelCaseKeys(data);

  return res.detailUser;
};

export default getUser;
