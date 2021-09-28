module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [
    __dirname + '/src/**/*.entity.ts'
  ],
  synchronize: true,
  migrationsTableName: 'custom_migration_table',
  migrations: ['./migrations/**/*.ts'],
  cli: {
    migrationsDir: './migration',
  },
};
