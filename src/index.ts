import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { env } from './config/env';
import { ApiError, ERROR_MESSAGE } from './helpers/error';
import httpStatus from 'http-status';
import { api } from './route/v1';
import helmet from 'helmet';

const App = async () => {
  try {
    await mongoose.connect(`${env.MONGODB_URL}`);

    const app = express();

    // set security HTTP headers
    app.use(helmet());

    // parse json request body
    app.use(express.json());

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }));

    app.use(morgan('dev'));

    // enable cors
    app.use(cors());
    app.options('*', cors());
    app.use('/api', api);

    app.use((_req, res, next) => {
      next(ApiError(res, ERROR_MESSAGE.NOT_FOUND, httpStatus.NOT_FOUND));
    });

    app.listen(parseInt(`${env.PORT}`), () => console.log(`Server is listening on port ${env.PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

App();
