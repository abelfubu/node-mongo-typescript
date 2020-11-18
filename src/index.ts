import express, { Application, RequestHandler, Response } from 'express';
import { dbConnection } from './database/config';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes';

declare global {
  namespace Express {
    interface Request {
      user?: string | object;
    }
  }
}

const app: Application = express();

// Environment variables
dotenv.config();

// Database connection
dbConnection();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes index
app.use('/api', router);

app.listen(PORT, () => console.log(`Server Running on port ${PORT}!`));
