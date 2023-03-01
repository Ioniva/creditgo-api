import http from 'http';
import JWTUtility from '../utilities/jwt.utility.js';
import PasswordUtility from '../utilities/password.utility.js';
import LoginData from '../../domain/entities/login_data.js';
import config from '../../../config/index.js';

class AuthService {
  async signin ({ email, password }) {
    const existingLoginData = await LoginData.findOne({ where: { email } });
    if (!existingLoginData) throw new Error('Invalid credentials', http.STATUS_CODES.UNAUTHORIZED);

    const isPasswordValid = await PasswordUtility.comparePasswords(
      password,
      existingLoginData.password
    );
    if (!isPasswordValid) throw new Error('Invalid credentials', http.STATUS_CODES.UNAUTHORIZED);

    const token = JWTUtility.sign(
      { id: existingLoginData.uuid, email: existingLoginData.email },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRATION }
    );

    return { token: token, message: 'User logged in successfully' };
  }
}

export default AuthService;
