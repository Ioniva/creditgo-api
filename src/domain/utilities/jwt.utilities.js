import jwt from 'jsonwebtoken';

class JWTUtility {
  static sign (payload, secret, options = {}) {
    return jwt.sign(payload, secret, options);
  }

  static verify (token, secret, options = {}) {
    return jwt.verify(token, secret, options);
  }

  static decode (token) {
    return jwt.decode(token);
  }
}

export default JWTUtility;
