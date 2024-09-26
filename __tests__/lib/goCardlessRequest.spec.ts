import { goCardlessClient } from '../../lib';
import connectorHelper from '../../lib/helper/connector-helper';

jest.mock('axios');
jest.mock('../../lib/helper/connector-helper');

describe('connector-helper fn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should make an goCardlessClient request', async () => {
    (connectorHelper as unknown as jest.Mock).mockResolvedValue({
      data: { homer: 'simpson' },
    });

    const gocardlessClient = await goCardlessClient({
      url: 'www.emmanuel.com',
      method: 'GET',
      body: null,
      access_token: 'ey348rere.ey9843rehfeh',
    });

    expect(gocardlessClient).toEqual({ data: { homer: 'simpson' } });
    expect(connectorHelper).toHaveBeenCalledTimes(1);
    expect(connectorHelper).toHaveBeenCalledWith(
      'www.emmanuel.com',
      'GET',
      null,
      { Authorization: 'Bearer ey348rere.ey9843rehfeh' }
    );
  });

  it('should make an goCardlessClient request (with req body present)', async () => {
    (connectorHelper as unknown as jest.Mock).mockResolvedValue({
      data: { homer: 'simpson' },
    });

    const gocardlessClient = await goCardlessClient({
      url: 'www.emmanuel.com',
      method: 'POST',
      body: { some: 'data' },
      access_token: 'ey348rere.ey9843rehfeh',
    });

    expect(gocardlessClient).toEqual({ data: { homer: 'simpson' } });
    expect(connectorHelper).toHaveBeenCalledTimes(1);
    expect(connectorHelper).toHaveBeenCalledWith(
      'www.emmanuel.com',
      'POST',
      { some: 'data' },
      { Authorization: 'Bearer ey348rere.ey9843rehfeh' }
    );
  });

  it('should have failed to make an goCardlessClient request', async () => {
    expect.assertions(3) as any;
    (connectorHelper as unknown as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to make request');
    });

    try {
      await goCardlessClient({
        url: 'www.emmanuel.com',
        method: 'GET',
        body: null,
        access_token: 'ey348rere.ey9843rehfeh',
      });
    } catch (err: any) {
      expect(err.message).toEqual('Failed to make request!');
      expect(connectorHelper).toHaveBeenCalledTimes(1);
      expect(connectorHelper).toHaveBeenCalledWith(
        'www.emmanuel.com',
        'GET',
        null,
        { Authorization: 'Bearer ey348rere.ey9843rehfeh' }
      );
    }
  });
});
