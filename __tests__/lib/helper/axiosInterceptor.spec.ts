import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import { createApiClient } from '../../../lib/helper/axiosInterceptor';
import { getAccessToken, refreshTokens } from '../../../lib/fetchTokens';

dotenv.config();

jest.mock('dotenv');
jest.mock('axios');
jest.mock('../../../lib/fetchTokens', () => ({
  getAccessToken: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedGetAccessToken = getAccessToken as jest.Mock;
const mockedRefreshTokens = refreshTokens as jest.Mock;

describe('createApiClient', () => {
  let apiClient: ReturnType<typeof createApiClient>;

  beforeEach(() => {
    (mockedAxios.create as any).mockReturnValue({
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<typeof axios>);

    apiClient = createApiClient();
  });

  it('should create an Axios instance', () => {
    expect(mockedAxios.create).toHaveBeenCalled();
  });

  it('should set up request interceptor', () => {
    expect(apiClient.interceptors.request.use).toHaveBeenCalled();
  });

  it('should set up response interceptor', () => {
    expect(apiClient.interceptors.response.use).toHaveBeenCalled();
  });

  it('should attach token in request headers', async () => {
    const mockConfig = { headers: {} } as InternalAxiosRequestConfig;
    mockedGetAccessToken.mockResolvedValue('mocked_token');

    const [requestInterceptor] = (apiClient.interceptors.request.use as jest.Mock).mock.calls[0];
    const modifiedConfig = await requestInterceptor(mockConfig);

    expect(modifiedConfig.headers.Authorization).toBe('Bearer mocked_token');
  });

  // it('should refresh token and retry request on 401 error', async () => {
  //   const mockError = {
  //     response: { status: 401 },
  //     config: { headers: {} },
  //   };
  //   mockedRefreshTokens.mockResolvedValue('new_token');
  //
  //   const [, responseErrorInterceptor] = (apiClient.interceptors.response.use as jest.Mock).mock.calls[0];
  //   const retryResponse = await responseErrorInterceptor(mockError);
  //
  //   expect(retryResponse.config.headers.Authorization).toBe('Bearer new_token');
  // });

  it('should reject other errors', async () => {
    const mockError = { response: { status: 500 } };

    const [, responseErrorInterceptor] = (apiClient.interceptors.response.use as jest.Mock).mock.calls[0];
    await expect(responseErrorInterceptor(mockError)).rejects.toEqual(mockError);
  });
});
