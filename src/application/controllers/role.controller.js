import db from '../../infraestructure/database/connection.js';
import RoleService from '../services/role.service.js';

// initializing
const roleService = new RoleService();

const getAllRoles = (async (req, resp, next) => {
    try {
        const roles = await roleService.getAllRoles();
        resp.status(200).json(roles);
    } catch (error) {
        next(error);
    }
});

const createRole = (async (req, resp, next) => {
    try {
        const roleDTO = req.body;
        const role = await roleService.createRole(roleDTO);
        resp.status(201).json("Se ha creado correctamente!");
    } catch (error) {
        next(error);
    }
})

export { getAllRoles, createRole }
