import connectorHelper from '../../../lib/helper/connector-helper';
import { request as api } from '../../../lib/helper/axiosInterceptor';

jest.mock('../../../lib/helper/axiosInterceptor');

describe('connector-helper fn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should make an axios request', async () => {
    (api?.request as unknown as jest.Mock).mockResolvedValue({
      data: { homer: 'simpson' },
    });

    const response = await connectorHelper(
      'www.example.com',
      'POST',
      {
        title: 'Hello World',
      }
    );
    expect(response).toEqual({ homer: 'simpson' });
    expect(api.request).toHaveBeenCalledTimes(1);
    expect(api.request).toHaveBeenCalledWith({
      data: '{"title":"Hello World"}',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
      url: 'www.example.com',
    });
  });

  it('should make an axios request (without req body present)', async () => {
    (api.request as unknown as jest.Mock).mockResolvedValue({
      data: { homer: 'simpson' },
    });

    const response = await connectorHelper(
      'www.example.com',
      'POST',
      {},
    );
    expect(response).toEqual({ homer: 'simpson' });
    expect(api.request).toHaveBeenCalledTimes(1);
    expect(api.request).toHaveBeenCalledWith({
      data: '{}',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
      url: 'www.example.com',
    });
  });

  it('should have failed to make an axios request', async () => {
    expect.assertions(3) as any;
    (api.request as unknown as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to make request');
    });

    try {
      await connectorHelper(
        'www.example.com',
        'GET',
        {
          title: 'Hello World',
        },
      );
    } catch (err: any) {
      expect(err.message).toEqual('Failed to make request');
      expect(api.request).toHaveBeenCalledTimes(1);
      expect(api.request).toHaveBeenCalledWith({
        data: '{"title":"Hello World"}',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
        method: 'GET',
        url: 'www.example.com',
      });
    }
  });
});
