import solicitationService from '../services/solicitation.service.js';

const getThisUserSolicitations = async (req, res) => {
  const response = await solicitationService.getThisUserSolicitations(req.headers.authorization);
  res.status(200).json(response);
};

const getSolicitationByUUID = async (req, res) => {
  const response = await solicitationService.getSolicitationByUUID(req.params.uuid);
  res.status(200).json(response);
};

const createSolicitation = async (req, res) => {
  const response = await solicitationService.createSolicitation(req.headers.authorization, req.body);
  res.status(201).json(response);
};

const getPendingSolicitations = async (req, res) => {
  const response = await solicitationService.getPendingSolicitations();
  res.status(200).json(response);
};

const getSolicitationByUUIDWithUserFinancialData = async (req, res) => {
  const response = await solicitationService.getSolicitationByUUIDWithUserFinancialData(req.params.uuid);
  res.status(200).json(response);
};

const updateSolicitationStateByUUID = async (req, res) => {
  const response = await solicitationService.updateSolicitationStateByUUID(req.params.uuid, req.body);
  res.status(200).json(response);
};

export {
  getThisUserSolicitations,
  getSolicitationByUUID,
  createSolicitation,
  getPendingSolicitations,
  getSolicitationByUUIDWithUserFinancialData,
  updateSolicitationStateByUUID
};
