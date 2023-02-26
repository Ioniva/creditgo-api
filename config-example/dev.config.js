const dev = {
  PORT: 4000,
  DATABASE: {
    DIALECT: 'postgres',
    MODELS_DIR: 'src/domain/entities',
    NAME: 'db-name',
    USER: 'db-access-user',
    PASS: 'db-access-user-password',
    HOST: '127.0.0.1',
    PORT: 5432
  },
  JWT_SECRET: 'super-secret-key',
  JWT_EXPIRATION: '1h'
};

export default dev;
