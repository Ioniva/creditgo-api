import LoginData from '../../domain/entities/login_data.js';

class LoginDataRepository {
  async createLoginData (email, password, transaction) {
    return await LoginData.create({ email, password }, { transaction: transaction });
  }
}

export default new LoginDataRepository();
