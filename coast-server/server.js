import express from 'express'
// Using ES6 imports
import { connect, model } from 'mongoose';
import { PassioEntry, passioCollectionName, mongoUrl, gtfsCollectionName, GtfsEntry } from './mongo_schemas.js';
import cors from 'cors';

const main = async () => {
    const app = express();
    app.use(cors())
    await connect(mongoUrl);
    const passioCollection = model(passioCollectionName, PassioEntry, passioCollectionName);
    const gtfsCollection = model(gtfsCollectionName, GtfsEntry, gtfsCollectionName);

    app.get('/chartData', async (req, res) => {
      const query = { timestamp:{ $gt: req.query.startTime || 0 }};

      if (req.query.buses && req.query.buses.length) {
        console.log(req.query.buses)
        query.bus = { $in: req.query.buses }
      }
      const result = await passioCollection.find(query);
      res.send(result);
    });

    app.listen(3000, () => console.log('Server is running on port 3000'));
}

main()