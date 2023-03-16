import Financial from '../entities/financial.js';

class FinancialRepository {
  async getFinancialByUUID (uuid) {
    return await Financial.findOne({
      where: { uuid },
      attributes: [
        'id',
        'idEmployeeType',
        'netMonthlyIncome',
        'netMonthlyExpense',
        'additionalIncome',
        'created_at',
        'updated_at',
        'uuid'
      ]
    });
  }

  async createFinancial (financial, transaction) {
    return await Financial.create(financial, { transaction, returning: false });
  }

  async deleteFinancialByUUID (uuid, transaction) {
    return await Financial.destroy({ where: { uuid } }, { transaction });
  }
}

export default new FinancialRepository();
