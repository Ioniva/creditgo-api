import sequelize from '../../infraestructure/database/connection.js';
import guarantorRepository from '../../domain/repositories/guarantor.repository.js';
// import userRepository from "../../domain/repositories/user.repository.js";
import employeeRepository from '../../domain/repositories/employee.repository.js';

async function getGuarantorByUUID (uuid) {
  const guarantor = await guarantorRepository.getGuarantorByUserUUID(uuid);
  if (!guarantor) throw new Error('Guarantor not found');

  return { guarantor: guarantor, message: 'Guarantor found' };
}

async function updateGuarantorByUUID (userUUID, guarantor) {
  const user = await guarantorRepository.getGuarantorByUserUUID(userUUID);
  if (!user) throw new Error('User not found');
  if (!user.guarantor) throw new Error('Guarantor not found');

  const transaction = await sequelize.transaction();
  try {
    const updatedGuarantor = await guarantorRepository.updateGuarantorByUserUUID(userUUID, guarantor, transaction);
    if (!updatedGuarantor) throw new Error('Guarantor not updated');

    await transaction.commit();
    return { guarantor: updatedGuarantor, message: 'Guarantor was updated' };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function createGuarantor ({ employeeType, ...guarantor }) {
  const existEmployeeType = await employeeRepository.getEmployeeTypeByCode(employeeType);
  if (!existEmployeeType) throw new Error('Employee type not found');

  const guarantorData = { idEmployeeType: existEmployeeType.id, ...guarantor };
  const transaction = await sequelize.transaction();

  try {
    const newGuarantor = await guarantorRepository.createGuarantor(guarantorData, transaction);
    if (!newGuarantor) throw new Error('Guarantor was not created');
    await transaction.commit();

    return { guarantor: newGuarantor, message: 'Guarantor created successfully' };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function deleteGuarantorByUUID (userUUID) {
  const user = await guarantorRepository.getGuarantorByUUID(userUUID);
  if (!user) throw new Error('User not found');

  const transaction = await sequelize.transaction();
  try {
    const deletedGuarantor = await guarantorRepository.deleteGuarantorByUUID(userUUID, transaction);
    if (!deletedGuarantor) throw new Error('Guarantor not deleted');

    await transaction.commit();
    return { message: 'Guarantor was deleted successfull' };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export default { getGuarantorByUUID, updateGuarantorByUUID, createGuarantor, deleteGuarantorByUUID };
