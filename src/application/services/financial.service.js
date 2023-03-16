import employeeRepository from '../../domain/repositories/employee.repository.js';
import financialRepository from '../../domain/repositories/financial.repository.js';
import sequelize from '../../infraestructure/database/connection.js';

const createFinancial = async ({ employeeType, ...financial }) => {
  const existEmployeeType = await employeeRepository.getEmployeeTypeByCode(employeeType);
  if (!existEmployeeType) throw new Error('Employee type not found');

  const financialData = { idEmployeeType: existEmployeeType.id, ...financial };
  const transaction = await sequelize.transaction();

  try {
    const newFinancialData = await financialRepository.createFinancial(financialData, transaction);
    if (!newFinancialData) throw new Error('Cannot create financial data');
    await transaction.commit();

    return { financialData: newFinancialData, message: 'Financial data created successfully' };
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};

const deleteFinancial = async ({ uuid }) => {
  const existFinancialData = await financialRepository.getFinancialByUUID(uuid);
  console.log('uuid: ', existFinancialData.uuid);
  if (!existFinancialData) throw new Error('Financial data not found');

  const transaction = await sequelize.transaction();
  try {
    const deletedFinancialData = await financialRepository.deleteFinancialByUUID(existFinancialData.uuid, transaction);
    if (!deletedFinancialData) throw new Error('Cannot delete financial data');
    await transaction.commit();

    return { message: 'Financial data deleted successfully' };
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};

export default { createFinancial, deleteFinancial };
