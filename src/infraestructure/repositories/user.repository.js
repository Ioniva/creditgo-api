import knex from "../database/connection.js";
import BaseRepository from "./base.repository.js";

class UserRepository extends BaseRepository {

    constructor() {
        super('user_login_data');
    }

    async createUserWithRole(user, roleId) {
        knex.from(this.tableName).insert(user).returning('id').asCallback(function (err, userId) {
            if (err) return console.log(err);
            knex('user_role').insert({
                id_user_login_data: parseInt(userId[0].id),
                id_role: roleId
            }).asCallback(function (err, userId) {
                if (err) return console.log(err);
            });
        })
    }

    async findByEmail(email) {
        const result = await knex.from(this.tableName).select('*').where({ email: email });
        return result[0];
    }
}

export default UserRepository;
