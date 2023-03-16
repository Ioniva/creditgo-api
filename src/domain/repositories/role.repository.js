import Role from '../entities/role.js';

class RoleRepository {
  async getAllRoles () {
    return await Role.findAll();
  }

  async getRoleByCode (code) {
    return await Role.findOne({ where: { code } });
  }

  async createRole (role, transaction) {
    return await Role.create(role, { transaction });
  }
}

export default new RoleRepository();
