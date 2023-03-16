import sequelize from '../../infraestructure/database/connection.js';
import bankRepository from '../../domain/repositories/bank.repository.js';

const getBankNames = async () => {
  const banks = await bankRepository.getAllBankNames();
  if (!banks.length) throw new Error('No bank names found');

  // const bankNameMapper = new BankNameMapper();
  // const banksDTO = banks.map(bankNameMapper.toDTO);
  // const bankNames = banksDTO.map((bank) => bank.name);
  // if (!bankNames.length) throw new Error("No bank names found");

  return { bankNames: banks, message: 'Bank names found successfully' };
};

const getBankTypes = async () => {
  const banks = await bankRepository.getAllBankTypes();
  if (!banks.length) throw new Error('No bank types found');

  // const bankTypeMapper = new BankTypeMapper();
  // const bankTypeDTO = banks.map((bank) => bankTypeMapper.toDTO(bank.dataValues));
  // if (!bankTypeDTO) throw new Error("No bank types found");

  return { bankTypes: banks, message: 'Bank types found successfully' };
};

const createBankAccount = async ({ bankName, bankType, ...req }) => {
  // const existBankAccount = await bankRepository.getBankAccountByNumber(req.bankNumber);
  // if (existBankAccount) throw new Error("Bank account already exists");

  const existBankName = await bankRepository.getBankNameByName(bankName);
  if (!existBankName) throw new Error('Bank name not found');

  const existBankType = await bankRepository.getBankTypeByCode(bankType);
  if (!existBankType) throw new Error('Bank type not found');

  const transaction = await sequelize.transaction();
  const bankAccount = {
    idBankName: existBankName.id,
    idBankType: existBankType.id,
    number: req.bankNumber,
    holder: req.bankHolder
  };

  try {
    const newBankAccount = await bankRepository.createBankAccount(bankAccount, transaction);
    if (!newBankAccount) throw new Error('Cannot create bank account');
    await transaction.commit();

    return { bankAccount: newBankAccount, message: 'Bank account created successfully' };
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};

const deleteBankAccount = async ({ uuid }) => {
  const existBankAccount = await bankRepository.getBankAccountByUUID(uuid);
  if (!existBankAccount) throw new Error('Bank account not found');

  const transaction = await sequelize.transaction();
  try {
    const deletedBankAccount = await bankRepository.deleteBankAccountByUUID(existBankAccount.uuid, transaction);
    if (!deletedBankAccount) throw new Error('Cannot delete bank account');
    await transaction.commit();

    return { message: 'Bank account deleted successfully' };
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};

export default { getBankNames, getBankTypes, createBankAccount, deleteBankAccount };
