import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import dotenv from 'dotenv';
import { getAccessToken, refreshTokens } from '../fetchTokens';

dotenv.config();

// const request = axios.create({
//   baseURL: process.env.BASE_URL!,
//   timeout: 5000,
// });
//
// request?.interceptors?.request?.use(
//   async (config: InternalAxiosRequestConfig) => {
//     const token = await getAccessToken();
//
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//
//     return config;
//   },
//   (err) => Promise.reject(err)
// );
//
// request?.interceptors?.response?.use(
//   async (response: AxiosResponse) => response,
//   async (err) => {
//     if (err.response.data.status === 401) {
//       const regeneratedToken = await refreshTokens();
//
//       if (regeneratedToken) {
//         err.response.headers.Authorization = `Bearer ${regeneratedToken}`;
//
//         return request(err.config);
//       }
//     }
//     return Promise.reject(err);
//   }
// );
//
// export { request };

export const createApiClient = (): AxiosInstance => {
  const request = axios.create({
    baseURL: process.env.BASE_URL!,
    timeout: 5000,
  });

  // Request Interceptor
  request.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  // Response Interceptor
  request.interceptors.response.use(
    async (response: AxiosResponse) => response,
    async (err) => {
      if (err.response?.status === 401) {
        const regeneratedToken = await refreshTokens();

        if (regeneratedToken) {
          err.config.headers.Authorization = `Bearer ${regeneratedToken}`;
          return request(err.config); // Retry the request
        }
      }
      return Promise.reject(err);
    }
  );

  return request;
};
