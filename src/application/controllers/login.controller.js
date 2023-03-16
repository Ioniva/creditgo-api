import loginService from '../services/login.service.js';

const signin = async (req, res, next) => {
  const response = await loginService.signin(req.body);
  res.status(200).json(response);
};

const signup = async (req, res, next) => {
  const response = await loginService.signup(req.body);
  res.status(200).json(response);
};

const signDelete = async (req, res, next) => {
  const response = await loginService.signDeleteByUUID(req.params.uuid);
  res.status(200).json(response);
};

export { signin, signup, signDelete };
