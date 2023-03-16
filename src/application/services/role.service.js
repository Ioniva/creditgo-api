import sequelize from '../../infraestructure/database/connection.js';
import roleRepository from '../../domain/repositories/role.repository.js';
import ValidationException from '../../application/exceptions/validation.exception.js';

const getAllRoles = async () => {
  const roles = await roleRepository.getAllRoles();
  if (!roles.length) throw new Error('Roles not found');

  // const rolesDTO = roles.map((role) => roleMapper.toDTO(role));
  // if (!rolesDTO.length) throw new Error("Roles not found");

  return { roles: roles, message: 'Roles found successfully' };
};

const createRole = async (req) => {
  const transaction = await sequelize.transaction();

  try {
    const role = await roleRepository.createRole(req, transaction);
    await transaction.commit();
    return { role: role, message: 'Role created successfully' };
  } catch (error) {
    await transaction.rollback();
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error('The role code already exists');
    }
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map((err) => ({
        message: err.message.replace('personal_data.', ''),
        type: err.type,
        path: err.path
      }));
      throw new ValidationException(errors);
    }
    throw new Error(error);
  }
};

export default { getAllRoles, createRole };
