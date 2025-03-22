import type { AccessTokenResponse } from '../model/auth-token-response';
import {AuthOperations} from "../operations/auth-operations";

export class AccessTokenManager {
  private authOps: AuthOperations;
  private readonly secretId: string;
  private readonly secretKey: string;

  private accessToken: string | null = null;
  private accessExpiresAt: number | null = null;

  private ongoingTokenRequest: Promise<string> | null = null;

  constructor(authOps: AuthOperations, secretId: string, secretKey: string) {
    this.authOps = authOps;
    this.secretId = secretId;
    this.secretKey = secretKey;
  }

  public async getAccessToken(): Promise<string> {
    console.log('making access token')
    const now = Date.now();
    const buffer = 5 * 1000; // optional: expire a few seconds early

    if (this.accessToken && this.accessExpiresAt && now < this.accessExpiresAt - buffer) {
      return this.accessToken;
    }

    if (this.ongoingTokenRequest) {
      return this.ongoingTokenRequest;
    }

    // this.ongoingTokenRequest = this.retrieveNewToken().finally(() => {
    //   this.ongoingTokenRequest = null;
    // });

    return await this.retrieveNewToken()
  }

  private async retrieveNewToken(): Promise<string> {
    try {
      const tokenData: AccessTokenResponse = await this.authOps.getToken(
          this.secretId,
          this.secretKey
      );

      this.accessToken = tokenData.access;
      this.accessExpiresAt = Date.now() + tokenData.access_expires * 1000;
      return this.accessToken;
    } catch (error) {
      this.accessToken = null;
      this.accessExpiresAt = null;
      throw error;
    }
  }

  public invalidateToken(): void {
    this.accessToken = null;
    this.accessExpiresAt = null;
  }
}
