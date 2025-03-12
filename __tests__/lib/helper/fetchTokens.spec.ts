process.env.SECRET_KEY = 'abc-123';
process.env.SECRET_ID = 'def-456';
process.env.BASE_URL = 'www.homer-simpson.com';

import axios from 'axios';
import { retrieveTokens } from '../../../lib/fetchTokens';

jest.mock('axios');

describe('test for retrieving tokens', () => {
  it('should fetch both the access and refresh tokens', async () => {
    (axios as unknown as jest.Mock).mockResolvedValue({
      data: { access: 'ey84fu4.eyr8rhr74', refresh: 'ey4384yr.ey84ur4hfr74' },
    });

    const response = await retrieveTokens();
    expect(response).toEqual('ey84fu4.eyr8rhr74');
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({
      data: {
        "secret_id": "def-456",
        "secret_key": "abc-123",
      },
      method: 'POST',
      "url": "www.homer-simpson.com/api/v2/token/new/",
    });
  });

  it('should fail to fetch both the access and refresh tokens', async () => {
    (axios as unknown as jest.Mock).mockImplementation(() => {
      throw new Error('oops');
    });

    try {
      await retrieveTokens();
    } catch(err: any) {
      expect(err.message).toEqual('oops');
      expect(axios).toHaveBeenCalled();
    }
  });
});
