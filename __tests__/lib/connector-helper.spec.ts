import axios from 'axios';
import connectorHelper from '../../lib/helper/connector-helper';

jest.mock('axios');

describe('connector-helper fn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should make an axios request', async () => {
    (axios as unknown as jest.Mock).mockResolvedValue({
      data: { homer: 'simpson' },
    });

    const response = await connectorHelper(
      'www.example.com',
      'GET',
      {
        title: 'Hello World',
      },
      {
        'content-type': 'application/json',
        Accept: 'application/json',
      }
    );
    expect(response).toEqual({ homer: 'simpson' });
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({
      data: '{"title":"Hello World"}',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'GET',
      url: 'www.example.com',
    });
  });

  it('should have failed to make an axios request', async () => {
    expect.assertions(3) as any;
    (axios as unknown as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to make request');
    });

    try {
      await connectorHelper(
        'www.example.com',
        'GET',
        {
          title: 'Hello World',
        },
        {
          'content-type': 'application/json',
          Accept: 'application/json',
        }
      );
    } catch (err: any) {
      expect(err.message).toEqual('Failed to make request');
      expect(axios).toHaveBeenCalledTimes(1);
      expect(axios).toHaveBeenCalledWith({
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
