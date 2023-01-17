import { connect, disconnect } from '../../infraestructure/database/db.js'
import { getUsers } from '../../domain/repositories/client.repository.js';

const getAllClient = (async (req, res, next) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
})

export { getAllClient };
