import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/dbConfig.js';
import birdRoutes from './routes/birdsRoutes.js';
import catRoutes from './routes/catsRoutes.js';
import dogRoutes from './routes/dogsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
const port = process.env.PORT;
connectDB();
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use('/api/birds', birdRoutes);
app.use('/api/cats', catRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/user', userRoutes);
app.use('/api/uploads', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (request, response) =>
    response.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (request, response) => {
    response.send('API is running....');
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
