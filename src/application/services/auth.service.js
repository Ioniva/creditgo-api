import http from 'http';
import JWTUtility from '../utilities/jwt.utility.js';
import PasswordUtility from '../utilities/password.utility.js';
import User from '../../domain/entities/user_login_data.js';
import config from '../../../config/index.js';

class AuthService {
  async signin ({ email, password }) {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) throw new Error('Invalid credentials', http.STATUS_CODES.UNAUTHORIZED);

    const isPasswordValid = await PasswordUtility.comparePasswords(password, existingUser.password);
    if (!isPasswordValid) throw new Error('Invalid credentials', http.STATUS_CODES.UNAUTHORIZED);

    const token = JWTUtility.sign(
      { id: existingUser.uuid, email: existingUser.email },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRATION }
    );

    return { token: token, message: 'User logged in successfully' };
  }
}

export default AuthService;
