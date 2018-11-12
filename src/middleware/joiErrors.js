import { isCelebrate } from 'celebrate';

const joiErrors = () => (err, req, res, next) => {
  if (!isCelebrate(err)) return next(err);
  const data = {
    success: false,
    errMsg: 'Bad Request',
    errFields: err.details || null,
  };
  return res.status(400).json(data);
};

export default joiErrors;
