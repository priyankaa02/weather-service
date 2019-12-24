import {Router, Request, Response, NextFunction} from 'express';
import { OAuth } from 'oauth';

export class WeatherRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }


  public getWeatherData(req: Request, res: Response, next: NextFunction) {
    let location = req.params.location;
    let header ={
        "X-Yahoo-App-Id": "lTMOjX5e"
    }
    let request = new OAuth(
        null,
        null,
        'dj0yJmk9dFlMVFN2aVlXZmZzJmQ9WVdrOWJGUk5UMnBZTldVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTg0',
        '5875be3115f91208d42b9fc876aa4f449c5c275a',
        '1.0',
        null,
        'HMAC-SHA1',
        null,
        header
      );
    request.get(
       'https://weather-ydn-yql.media.yahoo.com/forecastrss?location='+location+'&format=json',
        null,
        null,
        function (err, data, result) {
            if (err) {
              res.status(404)
              .send({
                message: 'No hero found with the given location.',
                status: res.status
              });
            } else {
                console.log(data)
                res.status(200)
                .send({
                  message: 'Success',
                  status: res.status,
                  data
                });
            }
        }
     );
  }

  init() {
    this.router.get('/:location', this.getWeatherData);
  }

}

const weatherRoutes = new WeatherRouter();
weatherRoutes.init();

export default weatherRoutes.router;