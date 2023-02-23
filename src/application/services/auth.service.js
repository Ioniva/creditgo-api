import JWTUtility from '../../domain/utilities/jwt.utilities.js';
import PasswordUtility from '../../domain/utilities/password.utilities.js';

import sequelize from '../../infraestructure/database/connection.js';
import User from '../../domain/entities/user.js';
import Role from '../../domain/entities/role.js';

import config from '../../../config/index.js';

import UserMapper from '../mappers/user.mapper.js';
const userMapper = new UserMapper();

class UserService {
  async signup (userDTO) {
    const { email, password } = userDTO;

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) return 'El usuario ya existe.';

    // Create the user and assign the customer role to it
    const hashedPassword = await PasswordUtility.encryptPassword(password);
    const userEntityFromDto = userMapper.toEntity({ email, password: hashedPassword });

    const transaction = await sequelize.transaction();
    try {
      const user = await User.create(userEntityFromDto, { transaction });
      const role = await Role.findOne({ where: { code: 'C' }, transaction });
      await user.addRole([role], { transaction }, { returning: false });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

    return 'Usuario creado exitosamente.';
  }

  async signin (userDTO) {
    try {
      const { email, password } = userDTO;

      // Check if email already exists
      const existingUser = await User.findOne({ where: { email: email }, include: Role });
      if (!existingUser) return 'El usuario no existe.';

      // Compare passwords
      const isPasswordCorrect = await PasswordUtility.comparePasswords(password, existingUser.password);
      if (!isPasswordCorrect) return 'Email o contraseña incorrecta.';

      // Create the token
      const token = await JWTUtility.sign(
        { id: existingUser.uuid, email: existingUser.email },
        config.JWT_SECRET,
        { expiresIn: config.JWT_EXPIRES_IN }
      );

      return token;
    } catch (error) {
      return error;
    }
  }
}

export default UserService;
