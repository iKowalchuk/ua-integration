import axios from 'axios';
import toCamelCaseKeys from '../utils/toCamelCaseKeys';

export type Menu = {
  accessFixed: number;
  accessRight: number;
  created: {
    date: string;
    timezoneType: number;
    timezone: string;
  };
  descr: string;
  descrFull: string;
  idAccess: number;
  idHouse: number;
  nameGroup: string;
  nameMenuTbot: string;
  pCmdIn: string;
  pCmdSend: string;
  pDeviceNameIn: string;
  pDeviceNameSend: string;
  pPhoneIn: string;
  sort: number;
};

const getMenu = async ({ token }: { token: string }): Promise<Menu[]> => {
  const { data } = await axios.post('https://interlock.pp.ua/api/ios.php', {
    cmd: 'get_my_menu',
    token,
  });

  if (typeof data !== 'object') {
    throw new Error();
  }

  const res = toCamelCaseKeys(data);

  return res.cmdResult;
};

export default getMenu;
