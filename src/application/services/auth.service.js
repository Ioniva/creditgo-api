import { v4 as uuidv4 } from 'uuid';

import PasswordUtility from '../../domain/utilities/password.utilities.js';
import UserRepository from '../../infraestructure/repositories/user.repository.js';
import RoleRepository from '../../infraestructure/repositories/role.repository.js';
import UserMapper from '../mappers/user.mapper.js';
import JWTUtility from '../../domain/utilities/jwt.utilities.js';

const userRepository = new UserRepository('user_login_data');
const roleRepository = new RoleRepository('user_login_data');
const userMapper = new UserMapper();

class UserService {
  async signup (userDTO) {
    try {
      const clientRole = 'C';
      const encryptedPassword = PasswordUtility.encryptPassword(userDTO.password);

      userDTO = { ...userDTO, password: encryptedPassword };

      let user = userMapper.toEntity(userDTO);
      user = { ...user, created_at: new Date(), uuid: uuidv4() };

      const roleId = await roleRepository.findIdByCode(clientRole);
      if (!roleId) return 'El role no existe.';
      await userRepository.createUserWithRole(user, roleId);
    } catch (error) {
      return error;
    }
  }

  async signin (email, password) {
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) return 'El usuario no existe.';

      const isMatch = PasswordUtility.comparePasswords(password, user.password);
      if (!isMatch) return 'Email o contraseña incorrectos';

      return JWTUtility.sign({ id: user.uuid }, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
      return error;
    }
  }
}

export default UserService;
