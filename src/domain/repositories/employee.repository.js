import EmployeeType from '../entities/employee_type.js';

class EmployeeRepository {
  async getEmployeeTypeByCode (code) {
    return await EmployeeType.findOne({ where: { code } });
  }
}

export default new EmployeeRepository();
