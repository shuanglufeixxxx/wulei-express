import redis, { RedisClient } from 'redis';
import { promisify } from 'util';

interface RedisClientWithAsync extends RedisClient {
    getAsync: (arg1: string) => Promise<string | null>
}

const _client = redis.createClient({
    host: process.env.WE_REDIS_HOST || 'localhost'
});

const getAsync = promisify(_client.get).bind(_client)

const client: RedisClientWithAsync = Object.assign(_client, { getAsync })

export { client }
