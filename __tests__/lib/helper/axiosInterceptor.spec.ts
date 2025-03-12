import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import { request as client } from '../../../lib/helper/axiosInterceptor';
import { getAccessToken } from '../../../lib/fetchTokens';

dotenv.config();

jest.mock('dotenv');
jest.mock('axios');
jest.mock('../../../lib/fetchTokens', () => ({
  getAccessToken: jest.fn(),
}));

const mockAxios = axios.create as jest.Mock;

// const api = {
//   get: jest.fn(),
//   post: jest.fn(),
//   put: jest.fn(),
//   delete: jest.fn(),
// };
//
// const request = {
//   interceptors: {
//     request: {
//       use: jest.fn((successCallback) => {
//         // Simulate calling the interceptor success callback
//         return successCallback;
//       }),
//     },
//   },
// };

// describe('request interceptor', () => {
//   // mockAxios.mockResolvedValue(request);
//   const mockedAxios = axios as jest.Mocked<typeof axios | any>;
//   mockedAxios.request.mockResolvedValue({ data: 'Hello World!' });
//
//   it('should work', async () => {
//     const token = 'eyferer.eyfdfedfd';
//     (getAccessToken as jest.Mock)?.mockImplementation(() => token);
//
//     const api = await request?.request({url: 'www.mock.com'})
//
//     console.log(api)
//
//     // expect(api).toEqual({ data: 'Hello World!' })
//   })
// })
