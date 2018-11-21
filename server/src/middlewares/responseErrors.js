import dotenv from 'dotenv';

dotenv.config();
const { NODE_ENV } = process.env;

const error404 = (req, res, next) => {
  if (NODE_ENV === 'production') {
    res.status(404).send('Not found');
  }
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

export {
  error404,
};
