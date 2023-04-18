import express, { Request, Response, NextFunction } from 'express';
import Logger from './helper/Logger';
import bodyParser from 'body-parser';
import cors from 'cors';
import { corsUrl, environment } from './config';
import './lib/cache/index' // Initialize Redis
import './database'; // initialize database
import { NotFoundError, ApiError, InternalError } from './helper/ApiError';
import routes from './routes';
import compression from 'compression'
import fileUpload from 'express-fileupload'
process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(fileUpload())
app.use(compression())

// Routes
app.use('/api/v1', routes);


// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === 'development') {
      Logger.error(err);
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
