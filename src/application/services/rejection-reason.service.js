import rejectionReasonRepository from '../../domain/repositories/rejection-reason.repository.js';

async function getAllRejectionReasons () {
  const rejectionReasons = await rejectionReasonRepository.getAllRejectionReasons();
  if (!rejectionReasons.length) throw new Error('No rejection reasons found');
  return { rejectionReasons: rejectionReasons, message: 'Rejection reasons found' };
}

export default { getAllRejectionReasons };
