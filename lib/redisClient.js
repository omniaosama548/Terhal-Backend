import dotenv from 'dotenv';
dotenv.config();

import { createClient } from 'redis';

console.log('REDIS_URL:', process.env.REDIS_URL);

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export default redisClient;
