import sequelize from '../../infraestructure/database/connection.js';
import JWTUtility from '../utilities/jwt.utility.js';
import config from '../../../config/index.js';

import solicitationRepository from '../../domain/repositories/solicitation.repository.js';
import userRepository from '../../domain/repositories/user.repository.js';
import stateRepository from '../../domain/repositories/state.repository.js';
import rejectionReasonRepository from '../../domain/repositories/rejection-reason.repository.js';

const getThisUserSolicitations = async (authHeader) => {
  if (!authHeader) throw new Error('Token is required');

  const token = authHeader.split(' ');
  if (token[0].trim() === ' bearer') throw new Error('Invalid bearer token'); // be careful with the space before bearer

  const payload = JWTUtility.verify(token[1], config.JWT_SECRET);
  if (!payload) throw new Error('Invalid token verification');

  const solicitations = await solicitationRepository.getSolicitationsByUserUUID(payload.uuid);
  return { solicitations: solicitations, message: 'Solicitations retrieved successfully' };
};

const getSolicitationByUUID = async (uuid) => {
  const solicitation = await solicitationRepository.getSolicitationByUUID(uuid);
  if (!solicitation) throw new Error('Solicitation not found');

  return { solicitation: solicitation, message: 'Solicitation retrieved successfully' };
};

// create a new solicitation and relationate with user uuid
const createSolicitation = async (authHeader, solicitation) => {
  if (!authHeader) throw new Error('Token is required');

  const token = authHeader.split(' ');
  if (token[0].trim() === ' bearer') throw new Error('Invalid bearer token'); // be careful with the space before bearer

  const payload = JWTUtility.verify(token[1], config.JWT_SECRET);
  if (!payload) throw new Error('Invalid token verification');

  const user = await userRepository.getUserByUUID(payload.uuid);
  if (!user) throw new Error('User not found');

  const state = await stateRepository.getStateByCode('D');
  if (!state) throw new Error('State not found');

  const transaction = await sequelize.transaction();
  try {
    const newSolicitation = await solicitationRepository.createSolicitation(
      { ...solicitation, idState: state.id },
      transaction
    );
    if (!newSolicitation) throw new Error('Error creating solicitation aasdad');

    await user.addSolicitation(newSolicitation, { transaction });

    await transaction.commit();
    return { solicitation: newSolicitation, message: 'Solicitation created successfully' };
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};

const getPendingSolicitations = async () => {
  const solicitations = await solicitationRepository.getPendingSolicitations();
  if (!solicitations) throw new Error('Pending solicitations not found');
  return { solicitations: solicitations, message: 'Pending solicitations retrieved successfully' };
};

const getSolicitationByUUIDWithUserFinancialData = async (uuid) => {
  const solicitation = await solicitationRepository.getSolicitationByUUIDWithUserFinancialData(uuid);
  if (!solicitation) throw new Error('Solicitation not found');

  return { solicitation: solicitation, message: 'Solicitation retrieved successfully' };
};

const updateSolicitationStateByUUID = async (uuid, { state, rejectionReason }) => {
  // validate state
  const stateFound = await stateRepository.getStateByCode(state);
  if (!stateFound) throw new Error('State not found');

  // validate rejection reason if not undefined
  let rejectionReasonFound;
  if (rejectionReason) {
    rejectionReasonFound = await rejectionReasonRepository.getRejectionReasonByCode(rejectionReason);
    if (!rejectionReasonFound) throw new Error('Rejection reason not found');
  }

  // update solicitation state by uuid
  const transaction = await sequelize.transaction();
  try {
    const solicitation = await solicitationRepository.updateSolicitationByUUID(
      uuid,
      { idState: stateFound.id, idRejectionReason: rejectionReason ? rejectionReasonFound.id : null },
      transaction
    );
    if (!solicitation) throw new Error('Error updating solicitation state');

    await transaction.commit();
    return { solicitation: solicitation, message: 'Solicitation state updated successfully' };
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};

export default {
  getThisUserSolicitations,
  getSolicitationByUUID,
  createSolicitation,
  getPendingSolicitations,
  getSolicitationByUUIDWithUserFinancialData,
  updateSolicitationStateByUUID
};
