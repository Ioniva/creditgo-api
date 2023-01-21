import knex from "../database/connection.js";
import BaseRepository from "./base.repository.js";

class UserRepository extends BaseRepository {

    constructor() {
        super('user_login_data');
    }

    async createUserWithRole(user, roleId) {
        knex.from('user_login_data').insert(user).returning('id').asCallback(function (err, userId) {
            if (err) return console.log(err);
            knex('user_role').insert({
                id_user_login_data: parseInt(userId[0].id),
                id_role: roleId
            }).asCallback(function (err, userId) {
                if (err) return console.log(err);
            });
        })
    }
}

export default UserRepository;
