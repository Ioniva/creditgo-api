import BankAccount from '../entities/bank_account.js';
import BankType from '../entities/bank_type.js';
import BanksName from '../entities/bank_name.js';

class BankRepository {
  async getBankNameByName (name) {
    return await BanksName.findOne({ where: { name } });
  }

  async getBankTypeByCode (code) {
    return await BankType.findOne({ where: { code } });
  }

  async getBankAccountByNumber (number) {
    return await BankAccount.findOne({ where: { number } });
  }

  async getBankAccountByUUID (uuid) {
    return await BankAccount.findOne({
      where: { uuid },
      attributes: ['id', 'idBankName', 'idBankType', 'number', 'holder', 'created_at', 'updated_at', 'uuid']
    });
  }

  async getAllBankNames () {
    return await BanksName.findAll();
  }

  async getAllBankTypes () {
    return await BankType.findAll();
  }

  async createBankAccount (bankAccount, transaction) {
    return await BankAccount.create(bankAccount, {
      transaction,
      returning: false
    });
  }

  async deleteBankAccountByUUID (uuid, transaction) {
    return await BankAccount.destroy({ where: { uuid }, transaction });
  }
}

export default new BankRepository();
