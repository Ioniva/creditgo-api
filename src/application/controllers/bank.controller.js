import bankService from '../services/bank.service.js';

const getBankNames = async (req, res) => {
  console.log('Estoy dentro de bank names...');
  try {
    const response = await bankService.getBankNames();
    res.status(200).json(response);
  } catch (error) {
    res.status(error.stausCode || 500).json({ message: error.message });
  }
};

const getBankTypes = async (req, res) => {
  try {
    const response = await bankService.getBankTypes();
    res.status(200).json(response);
  } catch (error) {
    res.status(error.stausCode || 500).json({ message: error.message });
  }
};

export { getBankNames, getBankTypes };
