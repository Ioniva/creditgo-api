import db from '../../infraestructure/database/connection.js';
import AuthService from '../services/auth.service.js'

// initializing
const authService = new AuthService();

const signup = (async (req, resp, next) => {
    try {
        const userDTO = req.body;
        await authService.signup(userDTO);
        resp.status(200).json("Se ha registrado correctamente!");
    } catch (error) {
        next(error);
    }
})

const signin = (async (req, resp, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.signin(email, password);
        resp.status(200).json(result);
    } catch (error) {
        next(error);
    }
})

export { signup, signin }
