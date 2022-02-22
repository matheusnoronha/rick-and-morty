const environment = process.env.NODE_ENV;
const dbConfig = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities:
    environment === 'test'
      ? [`src/domain/models/**/*.entity.ts`]
      : [`dist/domain/models/**/*.js`],
  database:
    environment === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  migrationsRun: environment === 'test',
};

module.exports = [
  {
    ...dbConfig,
    synchronize: environment === 'development',
    logging: true,
    logger: 'file',

    migrationsTableName: 'migrations',
    migrations: ['dist/infrastructure/database/migrations/*.js'],
    cli: {
      migrationsDir: 'src/infrastructure/database/migrations',
    },
  },
  {
    name: 'seed',
    ...dbConfig,
    migrationsTableName: 'seeds',
    migrations: ['dist/infrastructure/database/seeds/*.js'],
    cli: {
      migrationsDir: 'src/infrastructure/database/seeds',
    },
  },
];
