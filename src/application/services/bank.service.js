import http from 'http';
import BanksNames from '../../domain/entities/bank_name.js';
import BankTypes from '../../domain/entities/bank_type.js';
import BankTypeMapper from '../mappers/bank.type.mapper.js';
import BankNameMapper from '../mappers/bank.name.mapper.js';

async function getBankNames () {
  const banks = await BanksNames.findAll({ attributes: ['name'] });
  if (!banks.length) throw new Error('No bank names found', http.STATUS_CODES.UNAUTHORIZED);

  const bankNameMapper = new BankNameMapper();
  const banksDTO = banks.map(bankNameMapper.toDTO);
  const bankNames = banksDTO.map((bank) => bank.name);
  if (!bankNames.length) throw new Error('No bank names found', http.STATUS_CODES.UNAUTHORIZED);

  return { bankNames: bankNames, message: 'Bank names found successfully' };
}

async function getBankTypes () {
  const banks = await BankTypes.findAll({ attributes: ['name', 'code'] });
  if (!banks.length) throw new Error('No bank types found', http.STATUS_CODES.UNAUTHORIZED);

  const bankTypeMapper = new BankTypeMapper();
  const bankTypeDTO = banks.map((bank) => bankTypeMapper.toDTO(bank.dataValues));
  if (!bankTypeDTO) throw new Error('No bank types found', http.STATUS_CODES.UNAUTHORIZED);

  return { bankTypes: bankTypeDTO, message: 'Bank types found successfully' };
}

export default { getBankNames, getBankTypes };
