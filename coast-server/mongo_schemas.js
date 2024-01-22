import {Schema} from 'mongoose';

export const PassioEntry = new Schema({
    timestamp: Number,
    bus: String,
    busId: String, 
    paxLoad: Number, 
    totalCap: Number,
    latitude: String, 
    longitude: String
});

export const GtfsEntry = new Schema({
    trip: Object, 
    vehicle: Object, 
    position: Object, 
    stop_id: String, 
    current_stop_sequence: Number,
    timestamp: Number
}); 

export const RoutesEntry = new Schema({
    route_short_name: Number,
    route_long_name: String,
}); 

export const passioCollectionName = 'passio';

export const routesCollectionName = 'routes';

export const gtfsCollectionName = 'gtfs';

export const mongoUrl = 'mongodb://ec2-44-221-101-161.compute-1.amazonaws.com/admin'
