import axios from 'axios';
import dotenv from 'dotenv';
import { getAccessToken, refreshTokens } from '../fetchTokens';

dotenv.config();

let accessToken: String | null = null;

export default async (url: string, method: string, body?: object) => {
  if (!accessToken) accessToken = await getAccessToken();

  const headerOpts = {
    'content-type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  let data: object;

  try {
    ({ data } = await axios({
      url,
      method,
      ...(body ? { data: JSON.stringify(body) } : null),
      headers: headerOpts,
    }));
  } catch (err: any) {
    console.warn('Access token expired. Refreshing...');
    if (err.response?.data?.status === 401) {
      try {
        accessToken = await refreshTokens();

        const headerOpts = {
          'content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        };

        const { data } = await axios({
          url,
          method,
          ...(body ? { data: JSON.stringify(body) } : null),
          headers: headerOpts,
        });
        return data;
      } catch (err: any) {
        console.error('Unable to refresh token', err);
        throw new Error('Unable to refresh token');
      }
    }
    console.error(`API request failed: ${method} ${url}`, err);
    throw new Error(err.message);
  }

  return data;
};
