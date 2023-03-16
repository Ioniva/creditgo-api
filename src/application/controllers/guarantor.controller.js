import guarantorService from '../services/guarantor.service.js';

const getGuarantorByUUID = async (req, res) => {
  const response = await guarantorService.getGuarantorByUserUUID(req.params.uuid);
  res.status(200).json(response);
};

const updateGuarantorByUUID = async (req, res) => {
  const response = await guarantorService.updateGuarantorByUserUUID(req.params.uuid, req.body);
  res.status(200).json(response);
};

const createGuarantor = async (req, res) => {
  const response = await guarantorService.createGuarantor(req.body);
  res.status(200).json(response);
};

const deleteGuarantorByUUID = async (req, res) => {
  const response = await guarantorService.deleteGuarantorByUUID(req.params.uuid);
  res.status(200).json(response);
};

export { getGuarantorByUUID, updateGuarantorByUUID, createGuarantor, deleteGuarantorByUUID };
