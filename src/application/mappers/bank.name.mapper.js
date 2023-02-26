import BankNameDTO from '../DTOs/bank.name.dto.js';

class BankNameMapper {
  toDTO (bank) {
    return new BankNameDTO(bank.name);
  }

  toEntity (bankDTO) {
    return {
      id: bankDTO.id,
      name: bankDTO.name,
      createdAt: bankDTO.created_at,
      updatedAt: bankDTO.updated_at
    };
  }
}

export default BankNameMapper;
