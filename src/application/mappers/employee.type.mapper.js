import EmployeeTypeDTO from '../DTOs/employee.type.dto.js';

class EmployeeTypeMapper {
  toDTO (employee) {
    return new EmployeeTypeDTO(employee.name, employee.code);
  }

  toEntity (employeeDTO) {
    return {
      id: employeeDTO.id,
      name: employeeDTO.name,
      code: employeeDTO.code,
      createdAt: employeeDTO.created_at,
      updatedAt: employeeDTO.updated_at
    };
  }
}

export default EmployeeTypeMapper;
