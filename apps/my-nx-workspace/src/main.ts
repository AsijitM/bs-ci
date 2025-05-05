import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/delayed', (req, res) => {
  const randomDelay = Math.floor(Math.random() * 100);
  setTimeout(() => {
    res.send({ data: 'Delayed response' });
  }, randomDelay);
});

app.get('/not-found', (req, res) => {
  res.status(404).send({
    message: 'Resource not found',
    code: 'NOT_FOUND'
  });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
