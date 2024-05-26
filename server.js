import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;
const app = express();



app.get('/', (request, response) => {
  response.send('API running...');
});

app.get('/api/products', (request, response) => {
  response.json(products);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
