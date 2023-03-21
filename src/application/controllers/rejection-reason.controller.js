import rejectionReasonService from '../services/rejection-reason.service.js';

const getAllRejectionReasons = async (req, res) => {
  const response = await rejectionReasonService.getAllRejectionReasons();
  res.status(200).json(response);
};

export { getAllRejectionReasons };
