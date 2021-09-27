import dbConfig from './database.config';

export default () => ({
    port: process.env.PORT,
    database: dbConfig,
});

