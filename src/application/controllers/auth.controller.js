import AuthService from '../services/auth.service.js';

// initializing
const authService = new AuthService();

const signup = async (req, resp, next) => {
  try {
    const request = req.body;
    const response = await authService.signup(request);
    resp.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const signin = async (req, resp, next) => {
  try {
    const request = req.body;
    const response = await authService.signin(request);
    resp.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export { signup, signin };
