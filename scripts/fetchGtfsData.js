const Pbf = require('pbf');
const AdmZip = require('adm-zip');
const fs = require('fs');
const fetch = require('node-fetch');
const gtfsEndpoints = require('../ENDPOINTS.json').gtfs;
const schema = require('../gtfs-realtime');

const logRealtimeVehicles = async () => {
    const fetchResult = await fetch(gtfsEndpoints.realtimeVehicle).then((res) => res.arrayBuffer());
    const parsedResult = schema.FeedMessage.read(new Pbf(fetchResult));
    parsedResult.entity.map((i) => console.log(i.vehicle))
}

logRealtimeVehicles();