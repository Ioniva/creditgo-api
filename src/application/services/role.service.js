import BaseRepository from '../../infraestructure/repositories/base.repository.js';
import RoleDTO from '../DTOs/role.dto.js';
import RoleMapper from '../mappers/role.mapper.js';

const roleRepository = new BaseRepository('role');
const roleMapper = new RoleMapper();

class RoleService {

    async getAllRoles() {
        try {
            const roles = await roleRepository.findAll();
            return roles.map(role => roleMapper.toDTO(role));
        } catch (error) {
            throw (error);
        }
    };

    async createRole(roleDTO) {
        try {
            const role = roleMapper.toEntity(roleDTO);
            await roleRepository.create(role);
        } catch (error) {
            throw (error);
        }
    };

};

export default RoleService;
