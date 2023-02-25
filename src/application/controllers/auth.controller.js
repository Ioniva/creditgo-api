import AuthService from '../services/auth.service.js';
const authService = new AuthService();

// todo: SWAGGER DOC
const signin = async (req, res, next) => {
  try {
    const response = await authService.signin(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.stausCode || 500).json({ message: error.message });
  }
};

export { signin };
