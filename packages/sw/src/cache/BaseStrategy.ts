import type { CacheOptions, CacheStrategy } from './types.js';

export const CACHE_TIMESTAMP_HEADER = 'sw-cache-timestamp';

/**
 * Base class for caching strategies.
 */
export abstract class BaseStrategy implements CacheStrategy {
  protected cacheName: string;
  protected options: CacheOptions;

  /**
   * Creates an instance of BaseStrategy.
   * @param {string} cacheName - The name of the cache.
   * @param {Object} options - Configuration options for the strategy.
   */
  constructor(cacheName: string, options: CacheOptions = { maxEntries: 50 }) {
    this.cacheName = cacheName;
    this.options = options;
  }

  /**
   * Opens a cache with the given name.
   * @returns {Promise<Cache>} The cache object.
   */
  protected async openCache(): Promise<Cache> {
    return await caches.open(this.cacheName);
  }

  protected ensureRequest(request: Request | string | URL): Request {
    if (request instanceof URL || typeof request === 'string') {
      return new Request(request);
    }

    return request;
  }

  /**
   * Abstract method to handle requests.
   * Must be implemented by subclasses.
   * @param {Request} request - The request to handle.
   * @returns {Promise<Response>} The response from the cache or network.
   */
  abstract handleRequest(request: Request | string | URL): Promise<Response>;

  /**
   * Optional method to clean up the cache based on the defined options.
   * Can be overridden by subclasses for custom cleanup logic.
   */
  protected async cleanupCache(): Promise<void> {
    const cache = await this.openCache();
    const requests = await cache.keys();
    const now = Date.now();

    const maxAgePromises = requests.map(async request => {
      const response = await cache.match(request);
      const timestamp = response?.headers.get(CACHE_TIMESTAMP_HEADER);

      if (
        timestamp &&
        now - parseInt(timestamp, 10) >
          (this.options.maxAgeSeconds ?? 2_592_000) * 1_000 /* Assets are cached for one month, by default */
      ) {
        await cache.delete(request);
      }
    });

    const maxEntriesPromises = requests.map(async (_, index) => {
      if (index >= (this.options.maxEntries ?? 50)) {
        await cache.delete(requests[index]);
      }
    });

    await Promise.all([maxAgePromises, maxEntriesPromises]);
  }
}
