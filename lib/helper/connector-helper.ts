import axios from 'axios';

export default async (
  url: string,
  method: string,
  body: object,
  headers: object
) => {
  const headerOpts = {
    'content-type': 'application/json',
    Accept: 'application/json',
    ...headers,
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
    console.log('Failed to make request', err);
    throw new Error('Failed to make request');
  }

  return data;
};
