import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app = express();
const { port = 3000 } = process.env;

/* Apply the body-parser middleware to grab data
  from the request body and create application/json parser
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet); // Sets various http headers

app.get('/', (req, res) => {
  res.json({ msg: 'hello world' });
});

app.listen(port, () => {
  console.log(`Server listenning on port: ${port}...`);
});
