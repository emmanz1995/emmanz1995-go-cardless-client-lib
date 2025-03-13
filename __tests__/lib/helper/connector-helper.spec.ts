import connectorHelper from '../../../lib/helper/connector-helper';
import { createApiClient } from '../../../lib/helper/axiosInterceptor';

jest.mock('../../../lib/helper/axiosInterceptor');

describe('connector-helper fn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should make an axios request', async () => {});
});
