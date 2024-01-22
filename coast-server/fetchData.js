import endpoints from './ENDPOINTS.js';
import { connect, model } from 'mongoose';
import { PassioEntry, passioCollectionName, mongoUrl, gtfsCollectionName, GtfsEntry } from './mongo_schemas.js';
import axios from 'axios';
import cron from 'node-cron';

const main = async () => {
  // Connection URL
  await connect(mongoUrl);
  const passioCollection = model(passioCollectionName, PassioEntry, passioCollectionName);
  let mostRecentPaxRecords = new Map();
  // every minute between 5:00am and 9:00pm monday thru saturday
  cron.schedule('* 5-21 * * 1-6', async () => {
    const timestamp = Date.now();
    console.log("Fetching...");

    const passengerData = await fetchPasioGoData();
    const stopData = await fetchGtfsData();

    if (passengerData && passengerData.length) {
      const formattedData = [];
      passengerData.forEach((p) => {
        const busId = p.bus.trim();
        const mostRecentLoad = mostRecentPaxRecords.get(busId);

        // if the bus does not exist or has changed from last entry, then add. Using double equals to check undefined or null.
        if (mostRecentLoad == null || mostRecentLoad !== p.paxLoad) {
          formattedData.push({paxLoad: p.paxLoad, bus: busId, totalCap: p.totalCap, latitude: p.latitude, longitude: p.longitude, timestamp})
          mostRecentPaxRecords.set(busId, p.paxLoad)
        }
      });

      await passioCollection.insertMany(formattedData);
    }
  });
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