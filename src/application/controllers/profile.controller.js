import profileService from '../services/profile.service.js';

const createProfile = async (req, res, next) => {
  const response = await profileService.createProfile(req.body);
  res.status(200).json(response);
};

export { createProfile };
