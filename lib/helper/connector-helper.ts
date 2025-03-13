import { createApiClient as api } from './axiosInterceptor';

export default async (url: string, method: string, body?: object) => {
  const headerOpts = {
    'content-type': 'application/json',
    Accept: 'application/json',
  };
  let data: object;

  try {
    ({ data } = await api()?.request({
      url,
      method,
      ...(body ? { data: JSON.stringify(body) } : null),
      headers: headerOpts,
    }));
  } catch (err: any) {
    console.log('Failed to make request', err);
    throw new Error(err.message);
  }

  return data;
};
