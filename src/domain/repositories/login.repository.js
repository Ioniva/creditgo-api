import LoginData from '../entities/login_data.js';
import User from '../entities/user.js';

class LoginRepository {
  async getLoginDataByEmail (email) {
    return await LoginData.findOne({
      where: { email },
      include: { model: User, attributes: ['uuid'] }
    });
  }

  async getLoginDataByUUID (uuid) {
    return await LoginData.findOne({ where: { uuid } });
  }

  async createLoginData (loginData, transaction) {
    return await LoginData.create(loginData, { transaction });
  }

  async deleteLoginDataByUUID (uuid, transaction) {
    return await LoginData.destroy({ where: { uuid }, cascade: true, transaction });
  }
}

export default new LoginRepository();
