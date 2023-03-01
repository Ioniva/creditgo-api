import PersonalLoginData from '../../domain/entities/personal_login_data.js';

class PersonalLoginDataRepository {
  async createPersonalLoginData (loginData, personalData, transaction) {
    return await PersonalLoginData.create(
      {
        idLoginData: loginData.id,
        idPersonalData: personalData.id
      },
      { transaction: transaction }
    );
  }
}

export default new PersonalLoginDataRepository();
