import pg from 'pg'

const Client = pg.Client;

const connect = async () => {
    console.log(process.env.DB_HOST);
    const client = new Client({
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS.toString(),
        host: process.env.DB_HOST,
        port: 5432
    });

    await client.connect();
    return client;
}

const disconnect = async (client) => {
    await client.end();
}

export { connect, disconnect };
