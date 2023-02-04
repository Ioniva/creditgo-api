import RoleRepository from '../../infraestructure/repositories/role.repository.js';
import RoleDTO from '../DTOs/role.dto.js';
import RoleMapper from '../mappers/role.mapper.js';

const roleRepository = new RoleRepository('role');
const roleMapper = new RoleMapper();

class RoleService {
  async getAllRoles () {
    try {
      const roles = await roleRepository.findAll();
      return roles.map(role => roleMapper.toDTO(role));
    } catch (error) {
      return error;
    }
  }

  async createRole (roleDTO) {
    try {
      let role = roleMapper.toEntity(roleDTO);
      role = { ...role, created_at: new Date() };
      await roleRepository.create(role);
    } catch (error) {
      return error;
    }
  }
}

export default RoleService;
