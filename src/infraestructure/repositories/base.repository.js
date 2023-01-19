import knex from "../database/connection.js";

class BaseRepository {

    constructor(tableName) {
        this.tableName = tableName;
        this.createdAt = { created_at: new Date() };
    }

    async findAll() {
        return knex(this.tableName).select('*');
    }

    async findById(id) {
        return knex(this.tableName).select('*').where({ id });
    }

    async create(data) {
        console.log({ ...data, ...this.createdAt });
        return knex(this.tableName).insert({ ...data, ...this.createdAt });
    }

    async update(id, data) {
        return knex(this.tableName).update(data).where({ id });
    }

    async delete(id) {
        return knex(this.tableName).del().where({ id });
    }


}

export default BaseRepository;
