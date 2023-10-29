import Pbf from 'pbf';
import fetch from 'node-fetch';
import endpoints from './ENDPOINTS.js';
import { FeedMessage } from './gtfs-realtime.js';
import { connect, model } from 'mongoose';
import { PassioEntry, passioCollectionName, mongoUrl, gtfsCollectionName, GtfsEntry } from './mongo_schemas.js';
import axios from 'axios';
import cron from 'node-cron';

const main = async () => {
  // Connection URL
  await connect(mongoUrl);
  const passioCollection = model(passioCollectionName, PassioEntry, passioCollectionName);
  const gtfsCollection = model(gtfsCollectionName, GtfsEntry, gtfsCollectionName);


  // every minute between 5:00am and 9:00pm monday thru saturday
  cron.schedule('* 5-21 * * 1-6', async () => {
    const timestamp = Date.now();
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


/**
 * Contains relevant data such as current bus stop and speed.
 * @returns GTFS Stream data parsed into usable array.
 */
const fetchGtfsData = async() => {
    const fetchResult = await fetch(endpoints.gtfs.realtimeVehicle).then((res) => res.arrayBuffer());
    const parsedResult = FeedMessage.read(new Pbf(fetchResult));
    return parsedResult.entity.map((i) => i.vehicle);
}

/**
 * Contains relevant data for passenger load and total capacity.
 * @returns PassioGo data parsed into usable array.
 */
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