import STATUS_CODES from '../../../application/utilities/constants/STATUS_CODES.js';
import ValidationException from '../../../application/exceptions/ValidationException.js';

const errorHandler = (controllerFunction) => async (req, res, next) => {
  try {
    await controllerFunction(req, res);
  } catch (error) {
    if (error instanceof ValidationException) {
      return res.status(STATUS_CODES.BAD_REQUEST).json(error);
    }

    next(error);
  }
};

export default errorHandler;
