import { nodeCacheStore } from '../../lib';

describe('cache instance', () => {
  it('should contain node cache instance', () => {
    const cache = nodeCacheStore;

    expect(cache).toBeDefined();
  });
});
