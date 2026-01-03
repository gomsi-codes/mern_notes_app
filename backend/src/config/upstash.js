import pkg from '@upstash/ratelimit';
const { Ratelimit } = pkg;
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

//create a ratelimiter that allows 100 requests per 60 seconds
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(50, '20 s'),
});

export default rateLimit;