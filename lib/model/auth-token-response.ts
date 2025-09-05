export interface AccessTokenResponse {
  access: string;
  access_expires: number;
  refresh: string;
  refresh_expires: number;
}

export interface RefreshTokenResponse {
  access: string;
  access_expires: number;
}
