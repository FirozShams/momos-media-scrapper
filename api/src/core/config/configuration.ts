import dbConfig from './database.config';
import redisConfig from './redis.config';

export default () => ({
    port: process.env.PORT,
    database: dbConfig,
    redis: redisConfig
});

