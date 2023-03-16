import bankService from '../services/bank.service.js';

const getBankNames = async (req, res) => {
  const response = await bankService.getBankNames();
  res.status(200).json(response);
};

const getBankTypes = async (req, res) => {
  const response = await bankService.getBankTypes();
  res.status(200).json(response);
};

const createBankAccount = async (req, res) => {
  const response = await bankService.createBankAccount(req.body);
  res.status(200).json(response);
};

const deleteBankAccount = async (req, res) => {
  const response = await bankService.deleteBankAccount(req.params);
  res.status(200).json(response);
};

export { getBankNames, getBankTypes, createBankAccount, deleteBankAccount };
