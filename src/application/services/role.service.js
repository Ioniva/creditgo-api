import Role from '../../domain/entities/role.js';
import RoleMapper from '../mappers/role.mapper.js';
const roleMapper = new RoleMapper();

class RoleService {
  async getAllRoles () {
    try {
      const roles = await Role.findAll();
      return roles.map((role) => roleMapper.toDTO(role));
    } catch (error) {
      return error;
    }
  }

  async createRole (roleDTO) {
    try {
      const role = roleMapper.toEntity(roleDTO);
      await Role.create(role);
    } catch (error) {
      return error;
    }
  }
}

export default RoleService;
