import connectorHelper from './helper/connector-helper';
import { IFetchParams } from './helper/interfaces';

export default async (fetchParams: IFetchParams) => {
  const { url, method, body, access_token } = fetchParams;
  let response;

  try {
    response = await connectorHelper(url, method, body, {
      Authorization: `Bearer ${access_token}`,
    });
  } catch (err: any) {
    console.log('Failed to make request to go cardless', err);
    throw new Error('Failed to make request!');
  }

  return response;
};
