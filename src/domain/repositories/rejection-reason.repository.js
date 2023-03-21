import RejectionReason from '../entities/rejection-reason.js';

async function getAllRejectionReasons () {
  return await RejectionReason.findAll();
}

async function getRejectionReasonByCode (code) {
  return await RejectionReason.findOne({ where: { code } });
}

export default { getAllRejectionReasons, getRejectionReasonByCode };
