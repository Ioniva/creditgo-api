import http from 'http';
import EmployeeTypes from '../../domain/entities/employee_type.js';
import EmployeeTypeMapper from '../mappers/employee.type.mapper.js';

async function getEmployeeTypes () {
  const employees = await EmployeeTypes.findAll({ attributes: ['name', 'code'] });
  if (!employees.length) throw new Error('No employee types found', http.STATUS_CODES.UNAUTHORIZED);

  const employeeTypeMapper = new EmployeeTypeMapper();
  const employeeTypesDTO = employees.map((employee) => {
    return employeeTypeMapper.toDTO(employee.dataValues);
  });
  if (!employeeTypesDTO) throw new Error('No employee types found', http.STATUS_CODES.UNAUTHORIZED);

  return { employeeTypes: employeeTypesDTO, message: 'Employee types found successfully' };
}

export default { getEmployeeTypes };
