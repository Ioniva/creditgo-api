import db from '../../infraestructure/database/connection.js';
import UserService from '../services/user.service.js'

// initializing
const userService = new UserService();

const signup = (async (req, resp, next) => {
    try {
        const userDTO = req.body;
        await userService.createUser(userDTO);
        resp.status(200).json("Se ha registrado correctamente!")
    } catch (error) {
        next(error);
    }
})

export { signup }
