import employeeService from '../services/employee.service.js';

const getEmployeeTypes = async (req, res) => {
  try {
    const response = await employeeService.getEmployeeTypes();
    res.status(200).json(response);
  } catch (error) {
    res.status(error.stausCode || 500).json({ message: error.message });
  }
};

export { getEmployeeTypes };
