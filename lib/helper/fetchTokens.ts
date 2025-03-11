import axios from 'axios';

let accessToken: null = null;
let refreshToken: null = null;

const { SECRET_ID: secret_id, SECRET_KEY: secret_key } = process.env;

export const retrieveTokens = async () => {
  let data;
  try {
    ({ data } = await axios({
      url: `${process.env.BASE_URL}/api/v2/token/new/`,
      method: 'POST',
      data: { secret_id, secret_key },
    }));
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err.message);
  }

  accessToken = data.access;
  refreshToken = data.refresh;

  return accessToken;
};

export async function getAccessToken() {
  if (!accessToken && !refreshToken) {
    return await retrieveTokens();
  }
  return accessToken;
}

export async function refreshTokens(): Promise<String|null> {
  if (!accessToken && !refreshToken) {
    return await getAccessToken();
  }

  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/api/v2/token/new/`!,
      {
        secret_id,
        secret_key,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    accessToken = response.data?.access_token;
    refreshToken = response.data?.refresh_token;

    return accessToken;
  } catch (error) {
    console.error('Failed to refresh GoCardless access token:', error);
    accessToken = null;
    refreshToken = null;
    throw error;
  }
}
