import { connect, disconnect } from '../../infraestructure/database/db.js';

const getUsers = async () => {
    try {
        const client = await connect();
        try {
            const result = await client.query("SELECT * FROM role");
            return result.rows;
        } catch (err) {
            next(err);
        } finally {
            await disconnect(client);
        }
    } catch (err) {
        next(err);
    }
};

export { getUsers };
