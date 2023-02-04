import knex from '../database/connection.js';

class BaseRepository {
  constructor (tableName) {
    this.tableName = tableName;
  }

  async findAll () {
    return knex(this.tableName).select('*');
  }

  async findById (id) {
    return knex(this.tableName).select('*').where({ id });
  }

  async create (data) {
    return knex(this.tableName).insert(data);
  }

  async update (id, data) {
    return knex(this.tableName).update(data).where({ id });
  }

  async delete (id) {
    return knex(this.tableName).del().where({ id });
  }
}

export default BaseRepository;
