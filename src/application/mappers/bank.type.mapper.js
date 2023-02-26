import BankTypeDTO from '../DTOs/bank.type.dto.js';

class BankTypeMapper {
  toDTO (bank) {
    return new BankTypeDTO(bank.name, bank.code);
  }

  toEntity (bankDTO) {
    return {
      id: bankDTO.id,
      name: bankDTO.name,
      code: bankDTO.code,
      createdAt: bankDTO.created_at,
      updatedAt: bankDTO.updated_at
    };
  }
}

export default BankTypeMapper;
