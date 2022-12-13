import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, {NextFunction, Request, Response} from 'express';

import 'express-async-errors';

import logger from 'jet-logger';
import EnvVars from '@src/declarations/major/EnvVars';
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';
import {NodeEnvs} from '@src/declarations/enums';
import {RouteError} from '@src/declarations/classes';
import AuthRoute from "@src/routes/authRoute";
import PrivateRoute from "@src/routes/privateRoute";
import InterventionPOST from "@src/controllers/intervention/interventionPOST";
import InterventionRoute from "@src/routes/interventionRoute";


// **** Init express **** //

const app = express();

// **** Set basic express settings **** //

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.cookieProps.secret));

// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.nodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}


// **** Add API routes **** //

// Add APIs
app.use('/auth', AuthRoute);
app.use('/private', PrivateRoute);
app.use('/intervention', InterventionRoute);

app.all('*', (req: Request, res: Response) => {
  return (res.status(HttpStatusCodes.NOT_FOUND).json({error: 'Route not found'}));
});

// Setup error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  logger.err(err, true);
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

// **** Serve front-end content **** //

// Set static directory (js and css).
// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));


// **** Export default **** //

export default app;
