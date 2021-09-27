import dbConfig from './database.config';
import jwtConfig from './jwt.config';
import redisConfig from './redis.config';

export default () => ({
    port: process.env.PORT,
    database: dbConfig,
    redis: redisConfig,
    jwt: jwtConfig
});

