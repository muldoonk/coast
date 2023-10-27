import Pbf from 'pbf';
import fetch from 'node-fetch';
import endpoints from './ENDPOINTS.js';
import { FeedMessage } from './gtfs-realtime.js';
import { MongoClient } from 'mongodb';
import axios from 'axios';
import cron from 'node-cron';

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const main = async () => {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db('admin');
  const passioCollection = db.collection('passio');
  const gtfsCollection = db.collection('gtfs');


  const timestamp = Date.now();
  // every minute between 5:00am and 9:00pm monday thru saturday
  cron.schedule('* 5-21 * * 1-6', async () => {
    console.log("Fetching...");

    const passengerData = await fetchPasioGoData();
    const stopData = await fetchGtfsData();

    if (passengerData && passengerData.length) {
      const formattedData = passengerData.map(
        ({ paxLoad, bus, busId, totalCap, latitude, longitude }) => ({paxLoad, bus: bus.trim(), busId, totalCap, latitude, longitude, timestamp})
      );
      await passioCollection.insertMany(formattedData)
    }
    if (stopData && stopData.length) {
      const formattedData = stopData.map(
        ({trip, vehicle, position, stop_id, current_stop_sequence }) => ({trip, vehicle, position, stop_id, current_stop_sequence, timestamp}))
      await gtfsCollection.insertMany(formattedData)
    }
  });
}

// Does not contain passenger info we are interested in. Not using for now.
const fetchGtfsData = async() => {
    const fetchResult = await fetch(endpoints.gtfs.realtimeVehicle).then((res) => res.arrayBuffer());
    const parsedResult = FeedMessage.read(new Pbf(fetchResult));
    return parsedResult.entity.map((i) => i.vehicle);
}

const fetchPasioGoData = async() => {
    const result = await axios({method: 'POST', url: endpoints.passioGo.mapGetBusses, data: "json=%7B%22s0%22%3A%222962%22%2C%22sA%22%3A1%7D",})
    const resultObj = result.data.buses;
    const resultKeys = Object.keys(resultObj);
    const records = [];

    for (let busId of resultKeys) {
        records.push(resultObj[busId][0])
    }
    return records
}

main();