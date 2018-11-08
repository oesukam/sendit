import { isCelebrate } from 'celebrate';

const joiErrors = () => (err, req, res, next) => {
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

  // If this isn't a Joi error, send it to the next error handler
  return next(err);
};

export default joiErrors;
