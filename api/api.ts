import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROJECT_KEY } from '../constants/App';
import { Project } from './getProjects';

const baseURL = 'https://interlock.pp.ua';

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  async (config) => {
    const projectData = await AsyncStorage.getItem(PROJECT_KEY);
    const project: Project = projectData && JSON.parse(projectData);

    if (project?.urlSite) {
      config.baseURL = project.urlSite;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
