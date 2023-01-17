import pg from 'pg'
const Client = pg.Client;

const connect = async () => {

    const client = new Client({
        database: "creditgo",
        user: "postgres",
        password: "admin123",
        host: "127.0.0.1",
        port: 5432
    });

    await client.connect();
    return client;
}

const disconnect = async (client) => {
    await client.end();
}

export { connect, disconnect };
