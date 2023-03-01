import MaritalStatus from '../../domain/entities/marital_status.js';

class MaritalStatusRepository {
  async getMaritalStatusData (idMaritalStatus, transaction) {
    return await MaritalStatus.findOne(
      { where: { code: idMaritalStatus } },
      { transaction: transaction }
    );
  }
}

export default new MaritalStatusRepository();
