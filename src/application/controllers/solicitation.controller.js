import solicitationService from '../services/solicitation.service.js';

const getThisUserSolicitations = async (req, res) => {
  const response = await solicitationService.getThisUserSolicitations(req.headers.authorization);
  res.status(200).json(response);
};

export { getThisUserSolicitations };
