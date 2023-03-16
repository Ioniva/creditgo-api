import sequelize from '../../infraestructure/database/connection.js';

import bankRepository from '../../domain/repositories/bank.repository.js';
import userRepository from '../../domain/repositories/user.repository.js';
import loginRepository from '../../domain/repositories/login.repository.js';
import financialRepository from '../../domain/repositories/financial.repository.js';
import guarantorRepository from '../../domain/repositories/guarantor.repository.js';

// const getThisUser = async (authHeader) => {
//   const token = authHeader.replace("Bearer ", "");
//   if (!token) throw new Error("No token provided");

//   const payload = JWTUtility.verify(token, config.JWT_SECRET);
//   if (!payload) throw new Error("Invalid token");

//   const transaction = await sequelize.transaction();
//   try {
//     const user = await loginRepository.findLoginByUUID(payload.id, transaction);
//     if (!user) throw new Error("User not found");
//     // TODO: Aplicar mapper para devolver el DTO
//     return { user: user, message: "User found successfully" };
//   } catch (error) {
//     await transaction.rollback();
//     throw new Error(error);
//   }
// };

// const getAllUsers = async () => {
//   const users = await userRepository.getAllUsers();
//   if (!users) throw new Error("Users not found");

//   return { users: users, message: "Users found successfully" };
// };

/// ==========================
// ---- CHAT GPT EXAMPLE ----
/// ==========================
// const updateThisUser = async (authHeader, req) => {
// const loginDataId = 1; // replace with the login_data ID you want to update
// LoginData.findOne({
//   where: { id: loginDataId },
//   include: [ User ]
// })
// .then(loginData => {
//   if (loginData) {
//     // update the user and loginData objects
//     loginData.User.name = 'New Name';
//     loginData.User.email = 'newemail@example.com';
//     loginData.loginTime = new Date();
//     loginData.ipAddress = '127.0.0.1';

//     // save changes to the database
//     return Promise.all([loginData.User.save(), loginData.save()]);
//   } else {
//     console.log(`LoginData with ID ${loginDataId} not found`);
//   }
// })
// .catch(err => {
//   console.error('Error updating loginData and user:', err);
// });
// };

const createUser = async (user) => {
  console.log('user: ', user);
  const loginData = await loginRepository.getLoginDataByUUID(user.loginDataUUID);
  if (!loginData) throw new Error('Cannot find login data');

  const bankAccount = await bankRepository.getBankAccountByUUID(user.bankAccountUUID);
  if (!bankAccount) throw new Error('Cannot find bank account');

  const financial = await financialRepository.getFinancialByUUID(user.financialUUID);
  if (!financial) throw new Error('Cannot find financial');

  const guarantor = await guarantorRepository.getGuarantorByUUID(user.guarantorUUID);
  if (!guarantor) throw new Error('Cannot find guarantor');

  const transaction = await sequelize.transaction();
  const userData = {
    idLoginData: loginData.id,
    idBankAccount: bankAccount.id,
    idFinancial: financial.id,
    idGuarantor: guarantor.id,
    ...user
  };

  try {
    const newUser = await userRepository.createUser(userData, transaction);
    if (!newUser) throw new Error('Cannot create user');
    await transaction.commit();

    return { user: newUser, message: 'User created successfully' };
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};

const deleteUserByUUID = async (uuid) => {
  const userExist = await userRepository.getUserByUUID(uuid);
  if (!userExist) throw new Error('User not found');

  const transaction = await sequelize.transaction();
  try {
    const user = await userRepository.deleteUserByUUID(uuid);
    if (!user) throw new Error('Cannot delete user');
    await transaction.commit();

    return { message: 'User deleted successfully' };
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};

export default { createUser, deleteUserByUUID };
