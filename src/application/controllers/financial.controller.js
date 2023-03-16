import financialService from '../services/financial.service.js';

const createFinancial = async (req, res) => {
  const response = await financialService.createFinancial(req.body);
  res.status(200).json(response);
};

const deleteFinancial = async (req, res) => {
  const response = await financialService.deleteFinancial(req.params.uuid);
  res.status(200).json(response);
};

export { createFinancial, deleteFinancial };
