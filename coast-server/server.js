import express from 'express'
// Using ES6 imports
import { connect, model } from 'mongoose';
import { PassioEntry, passioCollectionName, mongoUrl, gtfsCollectionName, GtfsEntry } from './mongo_schemas.js';
import cors from 'cors';
import moment from 'moment'
import {Schema} from 'mongoose';

const main = async () => {
    const app = express();
    app.use(cors())
    await connect(mongoUrl);
    const passioCollection = model(passioCollectionName, PassioEntry, passioCollectionName);
    const gtfsCollection = model(gtfsCollectionName, GtfsEntry, gtfsCollectionName);

    const getTimeBoundsQuery = (req, query = {}) => {
      if (req.query.date) {
        const parsedMoment =  moment(req.query.date, 'YYYY-MM-DD');

        query.timestamp = {
          $gte: parsedMoment.hours(0).minutes(0).seconds(0).milliseconds(0).unix() * 1000, // .unix() returns seconds, but we store milliseconds
          $lte: parsedMoment.hours(23).minutes(59).seconds(59).milliseconds(999).unix() * 1000
        }
      }
      return query;
    };

    app.get('/chartData', async (req, res) => {
      let query = getTimeBoundsQuery(req)

      if (req.query.buses && req.query.buses.length) {
        query.bus = { $in: req.query.buses }
      }
      const result = await passioCollection.find(query).limit(1000); // shouldn't be that high, but just in case 
      res.send(result);
    });


    app.get('/maxPassenger', async (req, res) => {
      let query = getTimeBoundsQuery(req)

      if (req.query.buses && req.query.buses.length) {
        query.bus = { $in: req.query.buses }
      };
      const result = await passioCollection.find(query).sort({ paxLoad: '-1'}).limit(50);
      res.send(result);
    });


    app.listen(3000, () => console.log('Server is running on port 3000'));
}

main()