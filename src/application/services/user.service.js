import { v4 as uuidv4 } from 'uuid';

import PasswordUtility from "../../domain/utilities/password.utilities.js";
import UserRepository from "../../infraestructure/repositories/user.repository.js";
import RoleRepository from '../../infraestructure/repositories/role.repository.js';
import UserMapper from "../mappers/user.mapper.js";

const userRepository = new UserRepository('user_login_data');
const roleRepository = new RoleRepository('user_login_data');
const userMapper = new UserMapper();

class UserService {

    async createUser(userDTO) {
        try {
            const clientRole = "C";
            const encryptedPassword = PasswordUtility.encryptPassword(userDTO.password);

            userDTO = { ...userDTO, password: encryptedPassword }

            let user = userMapper.toEntity(userDTO);
            user = { ...user, created_at: new Date(), uuid: uuidv4() }

            let roleId = await roleRepository.findIdByCode(clientRole);
            if (!roleId) throw ("El role no existe.")
            await userRepository.createUserWithRole(user, roleId);
        } catch (error) {
            throw (error);
        }
    }
}

export default UserService;
