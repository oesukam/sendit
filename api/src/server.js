import express from 'express';

const app = express();
const { port = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Listenning to port: ${port}...`);
});
