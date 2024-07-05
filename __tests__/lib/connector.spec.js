const axios = require('axios');
const connector = require('../../lib/connector');

jest.mock('axios');

describe('connector function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should generate token data', async () => {
    process.env.BASE_URL = 'https://www.bankaccountdata.nordigen.com';
    process.env.SECRET_ID = 'abc-123';
    process.env.SECRET_KEY = 'def-456';

    axios?.mockResolvedValue({
      data: {
        access: 'ey484u38r.ey93u34jf.ey0r3ir39ur38u',
        access_expires: '12-02-2024',
        refresh: 'ey484u38r.ey93u34jf.ey0r3ir39ur38u',
        refresh_expires: '13-03-2024',
      },
    });

    const response = await connector.generateAuthToken();

    expect(response).toEqual({
      access: 'ey484u38r.ey93u34jf.ey0r3ir39ur38u',
      access_expires: '12-02-2024',
      refresh: 'ey484u38r.ey93u34jf.ey0r3ir39ur38u',
      refresh_expires: '13-03-2024',
    });
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({
      data: {
        secret_id: 'abc-123',
        secret_key: 'def-456',
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: 'https://www.bankaccountdata.nordigen.com/api/v2/token/new/',
    });
  });

  it('should fail to generate token data', async () => {
    process.env.BASE_URL = 'https://www.bankaccountdata.nordigen.com';
    process.env.SECRET_ID = 'abc-123';
    process.env.SECRET_KEY = 'def-456';

    axios?.mockImplementation(() => {
      throw new Error('oops');
    });

    try {
      await connector.generateAuthToken();
    } catch (err) {
      expect(err.message).toEqual('oops');
      expect(axios).toHaveBeenCalledTimes(1);
      expect(axios).toHaveBeenCalledWith({
        data: {
          secret_id: 'abc-123',
          secret_key: 'def-456',
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: 'https://www.bankaccountdata.nordigen.com/api/v2/token/new/',
      });
    }
  });
});
