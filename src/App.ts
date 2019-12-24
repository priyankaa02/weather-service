import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import WeatherRouter from './routes/WeatherRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;


  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(cors({origin: true, credentials: true}));
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Welcome!'
      });
    });
    this.express.use('/', router);
    this.express.use('/weather', WeatherRouter);
  }

}

export default new App().express;