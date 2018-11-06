import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();
const app = express();
const { PORT = 3000, NODE_ENV } = process.env;

// Check for working environment to start logging http request
if (NODE_ENV === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled');
}

app.use(helmet()); // Sets various http headers

/* Apply the body-parser middleware to grab data
  from the request body and create application/json parser
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json({ msg: 'hello world' });
});

app.listen(PORT, () => {
  console.log(`Server listenning on port: ${PORT}...`);
});
