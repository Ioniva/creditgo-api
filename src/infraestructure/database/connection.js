import knex from 'knex';
import config from '../../../config/index.js';

const connection = {
  host: config.DATABASE.HOST,
  user: config.DATABASE.USER,
  password: config.DATABASE.PASS,
  database: config.DATABASE.NAME
};

export default knex({ client: 'pg', connection });
