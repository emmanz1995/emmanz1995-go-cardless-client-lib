import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

let accessToken: null = null;
let refreshToken: null = null;

const { SECRET_ID: secret_id, SECRET_KEY: secret_key } = process.env;

export const retrieveTokens = async (): Promise<String|null> => {
  let data;
  console.log(process.env)
  try {
    ({ data } = await axios({
      url: `${process.env.BASE_URL}/api/v2/token/new/`,
      method: 'POST',
      data: { secret_id, secret_key },
    }));
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }

  accessToken = data.access;
  refreshToken = data.refresh;

  return accessToken;
};

export async function getAccessToken(): Promise<String | null> {
  if (!accessToken && !refreshToken) {
    return await retrieveTokens();
  }
  return accessToken;
}

export async function refreshTokens(): Promise<String | null> {
  if (!accessToken && !refreshToken) {
    return await getAccessToken();
  }

  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/api/v2/token/refresh`!,
      {
        refresh: refreshToken
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    accessToken = response.data?.access;

    return accessToken;
  } catch (err) {
    console.error('Failed to refresh GoCardless access token:', err);
    accessToken = null;
    refreshToken = null;
    throw err;
  }
}
