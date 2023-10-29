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

export const passioCollectionName = 'passio';

export const gtfsCollectionName = 'gtfs';

export const mongoUrl = 'mongodb://127.0.0.1/admin'
