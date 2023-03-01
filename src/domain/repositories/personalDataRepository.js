import PersonalData from '../../domain/entities/personal_data.js';

class PersonalDataRepository {
  async createPersonalData (req, maritalStatusData, transaction) {
    return await PersonalData.create(
      { ...req, idMaritalStatus: maritalStatusData.id },
      { transaction: transaction }
    );
  }

  async findPersonalData (uuid) {
    return await PersonalData.findOne({ where: { uuid } });
  }

  async updatePersonalData (uuid, updatedData) {
    const result = await PersonalData.update(updatedData, { where: { uuid } });
    return result[0] === 1; // returns true if one row was updated
  }

  async deletePersonalData (uuid) {
    const result = await PersonalData.destroy({ where: { uuid } });
    return result === 1; // returns true if one row was deleted
  }
}

export default new PersonalDataRepository();
