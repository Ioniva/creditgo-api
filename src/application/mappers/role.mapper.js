import RoleDTO from '../DTOs/role.dto.js';

class RoleMapper {
  toDTO (role) {
    return new RoleDTO(role.name, role.code);
  }

  toEntity (roleDTO) {
    return {
      id: roleDTO.id,
      name: roleDTO.name,
      code: roleDTO.code,
      createdAt: roleDTO.created_at,
      updatedAt: roleDTO.updated_at
    };
  }
}

export default new RoleMapper();
