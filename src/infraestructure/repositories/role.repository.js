import knex from '../database/connection.js';
import BaseRepository from './base.repository.js';

class RoleRepository extends BaseRepository {
  constructor () {
    super('role');
  }

  async findIdByCode (code) {
    const result = await knex(this.tableName).select('id').where({ code: code });
    return result[0].id;
  }
}

export default RoleRepository;
