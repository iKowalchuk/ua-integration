import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import toCamelCaseKeys from '../utils/toCamelCaseKeys';

type Login = {
  token: string;
  user: {
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
};

const login = async ({ login, password }: { login: string; password: string }): Promise<Login> => {
  const token = uuidv4();

  const { data } = await axios.post('https://interlock.pp.ua/api/ios.php', {
    login,
    password,
    token
  });

  if (typeof data !== 'object') {
    throw new Error();
  }

  const res = toCamelCaseKeys(data);

  return { user: res.detailUser, token };
};

export default login;
