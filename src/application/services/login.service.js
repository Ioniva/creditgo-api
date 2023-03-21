import sequelize from '../../infraestructure/database/connection.js';

import JWTUtility from '../utilities/jwt.utility.js';
import PasswordUtility from '../utilities/password.utility.js';
import config from '../../../config/index.js';

import loginRepository from '../../domain/repositories/login.repository.js';
import roleRepository from '../../domain/repositories/role.repository.js';
import userRepository from '../../domain/repositories/user.repository.js';

const signin = async ({ email, password }) => {
  const existingLoginData = await userRepository.getUserByLoginDataEmail(email);
  if (!existingLoginData) throw new Error('Invalid credentials');

  const roles = [];
  existingLoginData.roles.forEach((role) => roles.push(role.code));

  const user = {
    uuid: existingLoginData.user.uuid,
    name: existingLoginData.user.name,
    surname: existingLoginData.user.surname,
    email: existingLoginData.email,
    roles: roles
  };

  const isPasswordValid = await PasswordUtility.comparePasswords(password, existingLoginData.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = JWTUtility.sign(user, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION
  });

  return { token: token, message: 'User logged in successfully' };
};

const signup = async ({ email, password }) => {
  const clientRoleCode = 'C';

  const existingLoginData = await loginRepository.getLoginDataByEmail(email);
  if (existingLoginData) throw new Error('User already exists');

  const hashedPassword = await PasswordUtility.encryptPassword(password);
  if (!hashedPassword) throw new Error('Error hashing password');

  const role = await roleRepository.getRoleByCode(clientRoleCode);
  if (!role) throw new Error('Role not found');

  const transaction = await sequelize.transaction();
  try {
    const newLoginData = await loginRepository.createLoginData({ email, password: hashedPassword }, transaction);
    await newLoginData.addRole([role], { transaction });
    await transaction.commit();
    return { loginData: newLoginData, message: 'Login data created successfully' };
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};

const signDeleteByUUID = async (uuid) => {
  const loginData = await loginRepository.getLoginDataByUUID(uuid);
  if (!loginData) throw new Error('Login data not found');

  const transaction = await sequelize.transaction();
  try {
    const loginData = await loginRepository.deleteLoginDataByUUID(uuid, transaction);
    if (!loginData) throw new Error('Cannot delete login data');
    await transaction.commit();

    return { message: 'Login data deleted successfully' };
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};

export default { signin, signup, signDeleteByUUID };
