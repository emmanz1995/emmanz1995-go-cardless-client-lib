process.env.BASE_URL = 'www.homer-simpson.com';

jest.mock('axios');
jest.mock('../../../lib/fetchTokens', () => ({
  getAccessToken: jest.fn(),
  refreshTokens: jest.fn(),
}));

import axios from 'axios';
import connectorHelper from '../../../lib/helper/connector-helper';
import { getAccessToken, refreshTokens } from '../../../lib/fetchTokens';

describe('connector-helper fn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should make an axios request', async () => {
    (getAccessToken as unknown as jest.Mock).mockImplementation(
      () => 'eyyfu48484.eyr4u8ur8er8r'
    );
    (axios as unknown as jest.Mock).mockResolvedValue({
      status: 200,
      data: { hello: 'world!' },
    });

    const response = await connectorHelper(
      '/api/v2/institutions?country=GB',
      'GET'
    );

    expect(response).toEqual({ hello: 'world!' });
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer eyyfu48484.eyr4u8ur8er8r',
        'content-type': 'application/json',
      },
      method: 'GET',
      url: '/api/v2/institutions?country=GB',
    });
  });

  it('should make an axios request for (refresh token)', async () => {
    (axios as unknown as jest.Mock).mockResolvedValue({
      response: { status: 401, data: { status: 401 } },
    });

    (refreshTokens as unknown as jest.Mock).mockResolvedValue(
      'ey48u48.ey84u8r4ru8'
    );

    (axios as unknown as jest.Mock).mockResolvedValue({
      data: { access: 'ey34yyrrr47ry27.ey8rh4hr37h734h' },
      status: 200,
    });

    const response = await connectorHelper(
      '/api/v2/institutions?country=GB',
      'GET'
    );

    expect(response).toEqual({ access: 'ey34yyrrr47ry27.ey8rh4hr37h734h' });
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer eyyfu48484.eyr4u8ur8er8r',
        'content-type': 'application/json',
      },
      method: 'GET',
      url: '/api/v2/institutions?country=GB',
    });
  });
});
