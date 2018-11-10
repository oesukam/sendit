import { isCelebrate } from 'celebrate';

const joiErrors = () => (err, req, res, next) => {
  // Checks if it is a Joi error, otherwise, send it to the next error handler
  if (isCelebrate(err)) {
    let errFields = null;
    if (err.details) {
      errFields = err.details;
    }
    const data = {
      success: false,
      errMsg: 'Bad Request',
      errFields,
    };
    return res.status(400).json(data);
  }

  return next(err);
};

export default joiErrors;
