import userService from '../services/user.service.js';

// const getThisUser = async (req, res, next) => {
//   const response = await userService.getThisUser(req.headers.authorization);
//   res.status(200).json(response);
// };

// const getAllUsers = async (req, res, next) => {
//   const response = await userService.getAllUsers();
//   res.status(200).json(response);
// };

const createUser = async (req, res, next) => {
  const response = await userService.createUser(req.body);
  res.status(200).json(response);
};

const deleteUser = async (req, res, next) => {
  const response = await userService.deleteUserByUUID(req.params.uuid);
  res.status(200).json(response);
};

export { createUser, deleteUser };
