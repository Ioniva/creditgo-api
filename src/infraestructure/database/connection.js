import knex from 'knex';

const connection = {
    host: 'localhost',
    user: 'postgres',
    password: 'admin123',
    database: 'creditgo'
};

export default knex({ client: 'pg', connection });
