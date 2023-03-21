import LoginData from '../../domain/entities/login_data.js';
import Role from '../entities/role.js';
import User from '../entities/user.js';

class UserRepository {
  async getAllUsers () {
    return await User.findAll();
  }

  async getUserByUUID (uuid) {
    return await User.findOne({ where: { uuid } });
  }

  async getUserByLoginDataEmail (email) {
    return await LoginData.findOne({
      where: { email },
      include: [
        {
          model: User,
          attributes: ['uuid', 'name', 'surname']
        },
        {
          model: Role,
          attributes: ['code']
        }
      ]
    });
  }

  async createUser (user, transaction) {
    return await User.create(user, { transaction, returning: false });
  }

  async deleteUserByUUID (uuid, transaction) {
    return await User.destroy({ where: { uuid } }, transaction);
  }
}

export default new UserRepository();
