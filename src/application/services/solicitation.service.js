import JWTUtility from '../utilities/jwt.utility.js';

import solicitationRepository from '../../domain/repositories/solicitation.repository.js';
import config from '../../../config/index.js';

const getThisUserSolicitations = async (authHeader) => {
  const token = authHeader.replace('Bearer ', '');
  if (!token) throw new Error('Token is required');

  const payload = JWTUtility.verify(token, config.JWT_SECRET);
  if (!payload) throw new Error('Invalid token');

  const solicitations = await solicitationRepository.getSolicitationsByUserUUID(payload.uuid);
  return { solicitations: solicitations, message: 'Solicitations retrieved successfully' };
};

export default { getThisUserSolicitations };
