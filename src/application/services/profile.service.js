import sequelize from '../../infraestructure/database/connection.js';

import loginDataRepository from '../../domain/repositories/loginDataRepository.js';
import maritalStatusRepository from '../../domain/repositories/maritalStatusRepository.js';
import personalDataRepository from '../../domain/repositories/personalDataRepository.js';
import personalLoginDataRepository from '../../domain/repositories/personalLoginDataRepository.js';

import ValidationException from '../../application/exceptions/ValidationException.js';

const createProfile = async (req) => {
  const { email, password, idMaritalStatus } = req;
  const transaction = await sequelize.transaction();

  try {
    const loginData = await loginDataRepository.createLoginData(email, password, transaction);
    const maritalStatusData = await maritalStatusRepository.getMaritalStatusData(idMaritalStatus, transaction);
    const personalData = await personalDataRepository.createPersonalData(req, maritalStatusData, transaction);
    await personalLoginDataRepository.createPersonalLoginData(loginData, personalData, transaction);

    await transaction.commit();

    return {
      user: {
        uuid: personalData.uuid,
        name: personalData.name,
        surname: personalData.surname,
        phone: personalData.phone,
        email,
        createdAt: personalData.createdAt
      },
      message: 'Profile created successfully'
    };
  } catch (error) {
    await transaction.rollback();
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map((err) => ({
        message: err.message.replace('personal_data.', ''),
        type: err.type,
        path: err.path
      }));
      throw new ValidationException(errors);
    }
  }
};

export default { createProfile };
