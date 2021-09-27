import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL_KEY } from '../constants/App';

const baseURL = 'https://interlock.pp.ua';

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  async (config) => {
    const baseURL = await AsyncStorage.getItem(BASE_URL_KEY);

    if (baseURL) {
      config.baseURL = baseURL;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
