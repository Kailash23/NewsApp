import axios from 'axios';
import {apiUrls} from '../constants';

export const createAxiosInstance = (info) => {
  const {url, method, headers, data, params} = info;
  const axiosInstance = axios.create({
    baseURL: apiUrls.baseUrl,
  });

  axiosInstance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response?.data;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );

  return axiosInstance({url, method, headers, data, params});
};
