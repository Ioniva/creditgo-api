import Role from '../../domain/entities/role.js';

class RoleDTO {
    constructor(name, code) {
        this.name = name;
        this.code = code;
    };
}

export default RoleDTO;
