import express, { Application } from 'express';
import { dbConnection } from './database/config';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes';
import { DecToken } from './middleware/verify.token';
import { TokenPayload } from 'google-auth-library';

declare global {
  namespace Express {
    interface Request {
      user?: object | DecToken;
      payload?: TokenPayload;
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
app.use(express.static('public'));
// Routes index
app.use('/api', router);

app.listen(PORT, () => console.log(`Server Running on port ${PORT}!`));
