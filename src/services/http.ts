import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getToken } from '../utils/storage';

interface RequestConfig extends AxiosRequestConfig {
  payload?: object;
  headers?: Record<string, string>;
}

const defaultOptions: RequestConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  method: 'GET',
  timeout: 0,
};

// Create instance
const instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  // @ts-ignore: Ignore typ errors
  async (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      // @ts-ignore: Ignore type errors
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error === null) throw new Error('Unrecoverable error!');
    if (error.response) {
      if (error.code === 'ECONNABORTED')
        throw new Error('Network timeout, please try again');
      else if (error.code === 'ERR_CANCELED') {
        return;
      }
      throw error.response.data as AxiosError;
    }
    // Do nothing for canceled requests
    else if (error.request) {
      throw new Error(
        'This request is taking too long, please check your network',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  },
);
export default instance;

export const createRequest = (config: RequestConfig) => instance(config);
