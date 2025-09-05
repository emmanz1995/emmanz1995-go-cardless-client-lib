import {
  AccessTokenResponse,
  RefreshTokenResponse,
} from '../model/auth-token-response';
import type { AxiosInstance } from 'axios';

export interface AuthOperations {
  getToken(secretId: string, secretKey: string): Promise<AccessTokenResponse>;
  refreshTokens(refreshToken: string): Promise<RefreshTokenResponse>;
}

export class AuthOperationsImpl implements AuthOperations {
  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  async getToken(
    secretId: string,
    secretKey: string
  ): Promise<AccessTokenResponse> {
    try {
      return await this.axios.post(`/api/v2/token/new/`, {
        secret_id: secretId,
        secret_key: secretKey,
      });
    } catch (err: any) {
      console.error('Error retrieving tokens:', err);
      throw new Error(err.message);
    }
  }

  async refreshTokens(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      return await this.axios.post(
        `/api/v2/token/refresh`,
        { refresh: refreshToken },
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
    } catch (err: any) {
      console.error('Failed to refresh access token:', err);
      throw new Error(err.message);
    }
  }
}
