import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import toCamelCaseKeys from '../utils/toCamelCaseKeys';

const login = async ({ login, password }: { login: string; password: string }): Promise<any> => {
  const token = uuidv4();

  const { data } = await axios.post('https://interlock.pp.ua/api/ios.php', {
    login,
    password,
    token
  });

  return toCamelCaseKeys({ token });
};

export default login;
