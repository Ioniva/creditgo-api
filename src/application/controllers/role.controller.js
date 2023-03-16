import roleService from '../services/role.service.js';

const getAllRoles = async (req, resp, next) => {
  const response = await roleService.getAllRoles();
  resp.status(200).json(response);
};

const createRole = async (req, resp, next) => {
  const response = await roleService.createRole(req.body);
  resp.status(201).json(response);
};

export { getAllRoles, createRole };
