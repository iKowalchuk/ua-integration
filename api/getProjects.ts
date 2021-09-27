import api from './api';
import toCamelCaseKeys from '../utils/toCamelCaseKeys';

export type Project = {
  id: number;
  idProject: number;
  name: string;
  urlSite: string;
  urlApiIos: string;
  descr: string;
  detail: string;
  created: {
    date: string;
    timezoneType: number;
    timezone: string;
  };
  disabled: number;
  sort: number;
  tBot: string;
};

const getProjects = async (): Promise<Project[]> => {
  const { data } = await api.post('/api/ios.php', {
    cmd: 'get_all_projects',
  });

  if (typeof data !== 'object') {
    throw new Error();
  }

  const res = toCamelCaseKeys(data);

  return res.cmdResult;
};

export default getProjects;
