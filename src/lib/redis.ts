import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || '';

export const redis = redisUrl ? new Redis(redisUrl) : null;

export async function getCachedData<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached) as T;
  }
  return null;
}

export async function setCachedData(key: string, data: any, ttl: number = 3600): Promise<void> {
  if (!redis) return;
  await redis.set(key, JSON.stringify(data), 'EX', ttl);
}
