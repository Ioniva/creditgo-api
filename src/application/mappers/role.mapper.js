import Role from "../../domain/entities/role.js";
import RoleDTO from "../DTOs/role.dto.js";

class RoleMapper {

    toDTO(role) {
        return new RoleDTO(role.name, role.code);
    }

    toEntity(roleDTO) {
        return new Role(
            roleDTO.id,
            roleDTO.name,
            roleDTO.code,
            roleDTO.created_at,
            roleDTO.updated_at);
    }

}

export default RoleMapper;
