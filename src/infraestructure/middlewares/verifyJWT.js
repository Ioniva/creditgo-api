import JWTUtility from '../../domain/utilities/jwt.utilities.js';

const verifyJWT = (req, resp, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) resp.status(401).json({ error: 'No token provided' });

    const payload = JWTUtility.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    next();
  } catch (error) {
    return resp.status(401).json({ error: 'Invalid token' });
  }
};

export default verifyJWT;
