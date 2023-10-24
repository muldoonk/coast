'use strict'; // code generated by pbf v3.2.1

// FeedMessage ========================================

var FeedMessage = {};

FeedMessage.read = function (pbf, end) {
    return pbf.readFields(FeedMessage._readField, {header: null, entity: []}, end);
};
FeedMessage._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.header = FeedHeader.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 2) obj.entity.push(FeedEntity.read(pbf, pbf.readVarint() + pbf.pos));
};
FeedMessage.write = function (obj, pbf) {
    if (obj.header) pbf.writeMessage(1, FeedHeader.write, obj.header);
    if (obj.entity) for (var i = 0; i < obj.entity.length; i++) pbf.writeMessage(2, FeedEntity.write, obj.entity[i]);
};

// FeedHeader ========================================

var FeedHeader = {};

FeedHeader.read = function (pbf, end) {
    return pbf.readFields(FeedHeader._readField, {gtfs_realtime_version: "", incrementality: {"value":0,"options":{}}, timestamp: 0}, end);
};
FeedHeader._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.gtfs_realtime_version = pbf.readString();
    else if (tag === 2) obj.incrementality = pbf.readVarint();
    else if (tag === 3) obj.timestamp = pbf.readVarint();
};
FeedHeader.write = function (obj, pbf) {
    if (obj.gtfs_realtime_version) pbf.writeStringField(1, obj.gtfs_realtime_version);
    if (obj.incrementality != undefined && obj.incrementality !== {"value":0,"options":{}}) pbf.writeVarintField(2, obj.incrementality);
    if (obj.timestamp) pbf.writeVarintField(3, obj.timestamp);
};

FeedHeader.Incrementality = {
    "FULL_DATASET": {
        "value": 0,
        "options": {}
    },
    "DIFFERENTIAL": {
        "value": 1,
        "options": {}
    }
};

// FeedEntity ========================================

var FeedEntity = {};

FeedEntity.read = function (pbf, end) {
    return pbf.readFields(FeedEntity._readField, {id: "", is_deleted: false, trip_update: null, vehicle: null, alert: null, shape: null}, end);
};
FeedEntity._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.id = pbf.readString();
    else if (tag === 2) obj.is_deleted = pbf.readBoolean();
    else if (tag === 3) obj.trip_update = TripUpdate.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 4) obj.vehicle = VehiclePosition.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 5) obj.alert = Alert.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 6) obj.shape = Shape.read(pbf, pbf.readVarint() + pbf.pos);
};
FeedEntity.write = function (obj, pbf) {
    if (obj.id) pbf.writeStringField(1, obj.id);
    if (obj.is_deleted) pbf.writeBooleanField(2, obj.is_deleted);
    if (obj.trip_update) pbf.writeMessage(3, TripUpdate.write, obj.trip_update);
    if (obj.vehicle) pbf.writeMessage(4, VehiclePosition.write, obj.vehicle);
    if (obj.alert) pbf.writeMessage(5, Alert.write, obj.alert);
    if (obj.shape) pbf.writeMessage(6, Shape.write, obj.shape);
};

// TripUpdate ========================================

var TripUpdate = {};

TripUpdate.read = function (pbf, end) {
    return pbf.readFields(TripUpdate._readField, {trip: null, vehicle: null, stop_time_update: [], timestamp: 0, delay: 0, trip_properties: null}, end);
};
TripUpdate._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.trip = TripDescriptor.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 3) obj.vehicle = VehicleDescriptor.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 2) obj.stop_time_update.push(TripUpdate.StopTimeUpdate.read(pbf, pbf.readVarint() + pbf.pos));
    else if (tag === 4) obj.timestamp = pbf.readVarint();
    else if (tag === 5) obj.delay = pbf.readVarint(true);
    else if (tag === 6) obj.trip_properties = TripUpdate.TripProperties.read(pbf, pbf.readVarint() + pbf.pos);
};
TripUpdate.write = function (obj, pbf) {
    if (obj.trip) pbf.writeMessage(1, TripDescriptor.write, obj.trip);
    if (obj.vehicle) pbf.writeMessage(3, VehicleDescriptor.write, obj.vehicle);
    if (obj.stop_time_update) for (var i = 0; i < obj.stop_time_update.length; i++) pbf.writeMessage(2, TripUpdate.StopTimeUpdate.write, obj.stop_time_update[i]);
    if (obj.timestamp) pbf.writeVarintField(4, obj.timestamp);
    if (obj.delay) pbf.writeVarintField(5, obj.delay);
    if (obj.trip_properties) pbf.writeMessage(6, TripUpdate.TripProperties.write, obj.trip_properties);
};

// TripUpdate.StopTimeEvent ========================================

TripUpdate.StopTimeEvent = {};

TripUpdate.StopTimeEvent.read = function (pbf, end) {
    return pbf.readFields(TripUpdate.StopTimeEvent._readField, {delay: 0, time: 0, uncertainty: 0}, end);
};
TripUpdate.StopTimeEvent._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.delay = pbf.readVarint(true);
    else if (tag === 2) obj.time = pbf.readVarint(true);
    else if (tag === 3) obj.uncertainty = pbf.readVarint(true);
};
TripUpdate.StopTimeEvent.write = function (obj, pbf) {
    if (obj.delay) pbf.writeVarintField(1, obj.delay);
    if (obj.time) pbf.writeVarintField(2, obj.time);
    if (obj.uncertainty) pbf.writeVarintField(3, obj.uncertainty);
};

// TripUpdate.StopTimeUpdate ========================================

TripUpdate.StopTimeUpdate = {};

TripUpdate.StopTimeUpdate.read = function (pbf, end) {
    return pbf.readFields(TripUpdate.StopTimeUpdate._readField, {stop_sequence: 0, stop_id: "", arrival: null, departure: null, departure_occupancy_status: 0, schedule_relationship: {"value":0,"options":{}}, stop_time_properties: null}, end);
};
TripUpdate.StopTimeUpdate._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.stop_sequence = pbf.readVarint();
    else if (tag === 4) obj.stop_id = pbf.readString();
    else if (tag === 2) obj.arrival = TripUpdate.StopTimeEvent.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 3) obj.departure = TripUpdate.StopTimeEvent.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 7) obj.departure_occupancy_status = pbf.readVarint();
    else if (tag === 5) obj.schedule_relationship = pbf.readVarint();
    else if (tag === 6) obj.stop_time_properties = TripUpdate.StopTimeUpdate.StopTimeProperties.read(pbf, pbf.readVarint() + pbf.pos);
};
TripUpdate.StopTimeUpdate.write = function (obj, pbf) {
    if (obj.stop_sequence) pbf.writeVarintField(1, obj.stop_sequence);
    if (obj.stop_id) pbf.writeStringField(4, obj.stop_id);
    if (obj.arrival) pbf.writeMessage(2, TripUpdate.StopTimeEvent.write, obj.arrival);
    if (obj.departure) pbf.writeMessage(3, TripUpdate.StopTimeEvent.write, obj.departure);
    if (obj.departure_occupancy_status) pbf.writeVarintField(7, obj.departure_occupancy_status);
    if (obj.schedule_relationship != undefined && obj.schedule_relationship !== {"value":0,"options":{}}) pbf.writeVarintField(5, obj.schedule_relationship);
    if (obj.stop_time_properties) pbf.writeMessage(6, TripUpdate.StopTimeUpdate.StopTimeProperties.write, obj.stop_time_properties);
};

TripUpdate.StopTimeUpdate.ScheduleRelationship = {
    "SCHEDULED": {
        "value": 0,
        "options": {}
    },
    "SKIPPED": {
        "value": 1,
        "options": {}
    },
    "NO_DATA": {
        "value": 2,
        "options": {}
    },
    "UNSCHEDULED": {
        "value": 3,
        "options": {}
    }
};

// TripUpdate.StopTimeUpdate.StopTimeProperties ========================================

TripUpdate.StopTimeUpdate.StopTimeProperties = {};

TripUpdate.StopTimeUpdate.StopTimeProperties.read = function (pbf, end) {
    return pbf.readFields(TripUpdate.StopTimeUpdate.StopTimeProperties._readField, {assigned_stop_id: ""}, end);
};
TripUpdate.StopTimeUpdate.StopTimeProperties._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.assigned_stop_id = pbf.readString();
};
TripUpdate.StopTimeUpdate.StopTimeProperties.write = function (obj, pbf) {
    if (obj.assigned_stop_id) pbf.writeStringField(1, obj.assigned_stop_id);
};

// TripUpdate.TripProperties ========================================

TripUpdate.TripProperties = {};

TripUpdate.TripProperties.read = function (pbf, end) {
    return pbf.readFields(TripUpdate.TripProperties._readField, {trip_id: "", start_date: "", start_time: "", shape_id: ""}, end);
};
TripUpdate.TripProperties._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.trip_id = pbf.readString();
    else if (tag === 2) obj.start_date = pbf.readString();
    else if (tag === 3) obj.start_time = pbf.readString();
    else if (tag === 4) obj.shape_id = pbf.readString();
};
TripUpdate.TripProperties.write = function (obj, pbf) {
    if (obj.trip_id) pbf.writeStringField(1, obj.trip_id);
    if (obj.start_date) pbf.writeStringField(2, obj.start_date);
    if (obj.start_time) pbf.writeStringField(3, obj.start_time);
    if (obj.shape_id) pbf.writeStringField(4, obj.shape_id);
};

// VehiclePosition ========================================

var VehiclePosition = {};

VehiclePosition.read = function (pbf, end) {
    return pbf.readFields(VehiclePosition._readField, {trip: null, vehicle: null, position: null, current_stop_sequence: 0, stop_id: "", current_status: {"value":2,"options":{}}, timestamp: 0, congestion_level: 0, occupancy_status: 0, occupancy_percentage: 0, multi_carriage_details: []}, end);
};
VehiclePosition._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.trip = TripDescriptor.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 8) obj.vehicle = VehicleDescriptor.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 2) obj.position = Position.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 3) obj.current_stop_sequence = pbf.readVarint();
    else if (tag === 7) obj.stop_id = pbf.readString();
    else if (tag === 4) obj.current_status = pbf.readVarint();
    else if (tag === 5) obj.timestamp = pbf.readVarint();
    else if (tag === 6) obj.congestion_level = pbf.readVarint();
    else if (tag === 9) obj.occupancy_status = pbf.readVarint();
    else if (tag === 10) obj.occupancy_percentage = pbf.readVarint();
    else if (tag === 11) obj.multi_carriage_details.push(VehiclePosition.CarriageDetails.read(pbf, pbf.readVarint() + pbf.pos));
};
VehiclePosition.write = function (obj, pbf) {
    if (obj.trip) pbf.writeMessage(1, TripDescriptor.write, obj.trip);
    if (obj.vehicle) pbf.writeMessage(8, VehicleDescriptor.write, obj.vehicle);
    if (obj.position) pbf.writeMessage(2, Position.write, obj.position);
    if (obj.current_stop_sequence) pbf.writeVarintField(3, obj.current_stop_sequence);
    if (obj.stop_id) pbf.writeStringField(7, obj.stop_id);
    if (obj.current_status != undefined && obj.current_status !== {"value":2,"options":{}}) pbf.writeVarintField(4, obj.current_status);
    if (obj.timestamp) pbf.writeVarintField(5, obj.timestamp);
    if (obj.congestion_level) pbf.writeVarintField(6, obj.congestion_level);
    if (obj.occupancy_status) pbf.writeVarintField(9, obj.occupancy_status);
    if (obj.occupancy_percentage) pbf.writeVarintField(10, obj.occupancy_percentage);
    if (obj.multi_carriage_details) for (var i = 0; i < obj.multi_carriage_details.length; i++) pbf.writeMessage(11, VehiclePosition.CarriageDetails.write, obj.multi_carriage_details[i]);
};

VehiclePosition.VehicleStopStatus = {
    "INCOMING_AT": {
        "value": 0,
        "options": {}
    },
    "STOPPED_AT": {
        "value": 1,
        "options": {}
    },
    "IN_TRANSIT_TO": {
        "value": 2,
        "options": {}
    }
};

VehiclePosition.CongestionLevel = {
    "UNKNOWN_CONGESTION_LEVEL": {
        "value": 0,
        "options": {}
    },
    "RUNNING_SMOOTHLY": {
        "value": 1,
        "options": {}
    },
    "STOP_AND_GO": {
        "value": 2,
        "options": {}
    },
    "CONGESTION": {
        "value": 3,
        "options": {}
    },
    "SEVERE_CONGESTION": {
        "value": 4,
        "options": {}
    }
};

VehiclePosition.OccupancyStatus = {
    "EMPTY": {
        "value": 0,
        "options": {}
    },
    "MANY_SEATS_AVAILABLE": {
        "value": 1,
        "options": {}
    },
    "FEW_SEATS_AVAILABLE": {
        "value": 2,
        "options": {}
    },
    "STANDING_ROOM_ONLY": {
        "value": 3,
        "options": {}
    },
    "CRUSHED_STANDING_ROOM_ONLY": {
        "value": 4,
        "options": {}
    },
    "FULL": {
        "value": 5,
        "options": {}
    },
    "NOT_ACCEPTING_PASSENGERS": {
        "value": 6,
        "options": {}
    },
    "NO_DATA_AVAILABLE": {
        "value": 7,
        "options": {}
    },
    "NOT_BOARDABLE": {
        "value": 8,
        "options": {}
    }
};

// VehiclePosition.CarriageDetails ========================================

VehiclePosition.CarriageDetails = {};

VehiclePosition.CarriageDetails.read = function (pbf, end) {
    return pbf.readFields(VehiclePosition.CarriageDetails._readField, {id: "", label: "", occupancy_status: {"value":7,"options":{}}, occupancy_percentage: -1, carriage_sequence: 0}, end);
};
VehiclePosition.CarriageDetails._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.id = pbf.readString();
    else if (tag === 2) obj.label = pbf.readString();
    else if (tag === 3) obj.occupancy_status = pbf.readVarint();
    else if (tag === 4) obj.occupancy_percentage = pbf.readVarint(true);
    else if (tag === 5) obj.carriage_sequence = pbf.readVarint();
};
VehiclePosition.CarriageDetails.write = function (obj, pbf) {
    if (obj.id) pbf.writeStringField(1, obj.id);
    if (obj.label) pbf.writeStringField(2, obj.label);
    if (obj.occupancy_status != undefined && obj.occupancy_status !== {"value":7,"options":{}}) pbf.writeVarintField(3, obj.occupancy_status);
    if (obj.occupancy_percentage != undefined && obj.occupancy_percentage !== -1) pbf.writeVarintField(4, obj.occupancy_percentage);
    if (obj.carriage_sequence) pbf.writeVarintField(5, obj.carriage_sequence);
};

// Alert ========================================

var Alert = {};

Alert.read = function (pbf, end) {
    return pbf.readFields(Alert._readField, {active_period: [], informed_entity: [], cause: {"value":1,"options":{}}, effect: {"value":8,"options":{}}, url: null, header_text: null, description_text: null, tts_header_text: null, tts_description_text: null, severity_level: {"value":1,"options":{}}, image: null, image_alternative_text: null, cause_detail: null, effect_detail: null}, end);
};
Alert._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.active_period.push(TimeRange.read(pbf, pbf.readVarint() + pbf.pos));
    else if (tag === 5) obj.informed_entity.push(EntitySelector.read(pbf, pbf.readVarint() + pbf.pos));
    else if (tag === 6) obj.cause = pbf.readVarint();
    else if (tag === 7) obj.effect = pbf.readVarint();
    else if (tag === 8) obj.url = TranslatedString.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 10) obj.header_text = TranslatedString.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 11) obj.description_text = TranslatedString.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 12) obj.tts_header_text = TranslatedString.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 13) obj.tts_description_text = TranslatedString.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 14) obj.severity_level = pbf.readVarint();
    else if (tag === 15) obj.image = TranslatedImage.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 16) obj.image_alternative_text = TranslatedString.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 17) obj.cause_detail = TranslatedString.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 18) obj.effect_detail = TranslatedString.read(pbf, pbf.readVarint() + pbf.pos);
};
Alert.write = function (obj, pbf) {
    if (obj.active_period) for (var i = 0; i < obj.active_period.length; i++) pbf.writeMessage(1, TimeRange.write, obj.active_period[i]);
    if (obj.informed_entity) for (i = 0; i < obj.informed_entity.length; i++) pbf.writeMessage(5, EntitySelector.write, obj.informed_entity[i]);
    if (obj.cause != undefined && obj.cause !== {"value":1,"options":{}}) pbf.writeVarintField(6, obj.cause);
    if (obj.effect != undefined && obj.effect !== {"value":8,"options":{}}) pbf.writeVarintField(7, obj.effect);
    if (obj.url) pbf.writeMessage(8, TranslatedString.write, obj.url);
    if (obj.header_text) pbf.writeMessage(10, TranslatedString.write, obj.header_text);
    if (obj.description_text) pbf.writeMessage(11, TranslatedString.write, obj.description_text);
    if (obj.tts_header_text) pbf.writeMessage(12, TranslatedString.write, obj.tts_header_text);
    if (obj.tts_description_text) pbf.writeMessage(13, TranslatedString.write, obj.tts_description_text);
    if (obj.severity_level != undefined && obj.severity_level !== {"value":1,"options":{}}) pbf.writeVarintField(14, obj.severity_level);
    if (obj.image) pbf.writeMessage(15, TranslatedImage.write, obj.image);
    if (obj.image_alternative_text) pbf.writeMessage(16, TranslatedString.write, obj.image_alternative_text);
    if (obj.cause_detail) pbf.writeMessage(17, TranslatedString.write, obj.cause_detail);
    if (obj.effect_detail) pbf.writeMessage(18, TranslatedString.write, obj.effect_detail);
};

Alert.Cause = {
    "UNKNOWN_CAUSE": {
        "value": 1,
        "options": {}
    },
    "OTHER_CAUSE": {
        "value": 2,
        "options": {}
    },
    "TECHNICAL_PROBLEM": {
        "value": 3,
        "options": {}
    },
    "STRIKE": {
        "value": 4,
        "options": {}
    },
    "DEMONSTRATION": {
        "value": 5,
        "options": {}
    },
    "ACCIDENT": {
        "value": 6,
        "options": {}
    },
    "HOLIDAY": {
        "value": 7,
        "options": {}
    },
    "WEATHER": {
        "value": 8,
        "options": {}
    },
    "MAINTENANCE": {
        "value": 9,
        "options": {}
    },
    "CONSTRUCTION": {
        "value": 10,
        "options": {}
    },
    "POLICE_ACTIVITY": {
        "value": 11,
        "options": {}
    },
    "MEDICAL_EMERGENCY": {
        "value": 12,
        "options": {}
    }
};

Alert.Effect = {
    "NO_SERVICE": {
        "value": 1,
        "options": {}
    },
    "REDUCED_SERVICE": {
        "value": 2,
        "options": {}
    },
    "SIGNIFICANT_DELAYS": {
        "value": 3,
        "options": {}
    },
    "DETOUR": {
        "value": 4,
        "options": {}
    },
    "ADDITIONAL_SERVICE": {
        "value": 5,
        "options": {}
    },
    "MODIFIED_SERVICE": {
        "value": 6,
        "options": {}
    },
    "OTHER_EFFECT": {
        "value": 7,
        "options": {}
    },
    "UNKNOWN_EFFECT": {
        "value": 8,
        "options": {}
    },
    "STOP_MOVED": {
        "value": 9,
        "options": {}
    },
    "NO_EFFECT": {
        "value": 10,
        "options": {}
    },
    "ACCESSIBILITY_ISSUE": {
        "value": 11,
        "options": {}
    }
};

Alert.SeverityLevel = {
    "UNKNOWN_SEVERITY": {
        "value": 1,
        "options": {}
    },
    "INFO": {
        "value": 2,
        "options": {}
    },
    "WARNING": {
        "value": 3,
        "options": {}
    },
    "SEVERE": {
        "value": 4,
        "options": {}
    }
};

// TimeRange ========================================

var TimeRange = {};

TimeRange.read = function (pbf, end) {
    return pbf.readFields(TimeRange._readField, {start: 0, end: 0}, end);
};
TimeRange._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.start = pbf.readVarint();
    else if (tag === 2) obj.end = pbf.readVarint();
};
TimeRange.write = function (obj, pbf) {
    if (obj.start) pbf.writeVarintField(1, obj.start);
    if (obj.end) pbf.writeVarintField(2, obj.end);
};

// Position ========================================

var Position = {};

Position.read = function (pbf, end) {
    return pbf.readFields(Position._readField, {latitude: 0, longitude: 0, bearing: 0, odometer: 0, speed: 0}, end);
};
Position._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.latitude = pbf.readFloat();
    else if (tag === 2) obj.longitude = pbf.readFloat();
    else if (tag === 3) obj.bearing = pbf.readFloat();
    else if (tag === 4) obj.odometer = pbf.readDouble();
    else if (tag === 5) obj.speed = pbf.readFloat();
};
Position.write = function (obj, pbf) {
    if (obj.latitude) pbf.writeFloatField(1, obj.latitude);
    if (obj.longitude) pbf.writeFloatField(2, obj.longitude);
    if (obj.bearing) pbf.writeFloatField(3, obj.bearing);
    if (obj.odometer) pbf.writeDoubleField(4, obj.odometer);
    if (obj.speed) pbf.writeFloatField(5, obj.speed);
};

// TripDescriptor ========================================

var TripDescriptor = {};

TripDescriptor.read = function (pbf, end) {
    return pbf.readFields(TripDescriptor._readField, {trip_id: "", route_id: "", direction_id: 0, start_time: "", start_date: "", schedule_relationship: 0}, end);
};
TripDescriptor._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.trip_id = pbf.readString();
    else if (tag === 5) obj.route_id = pbf.readString();
    else if (tag === 6) obj.direction_id = pbf.readVarint();
    else if (tag === 2) obj.start_time = pbf.readString();
    else if (tag === 3) obj.start_date = pbf.readString();
    else if (tag === 4) obj.schedule_relationship = pbf.readVarint();
};
TripDescriptor.write = function (obj, pbf) {
    if (obj.trip_id) pbf.writeStringField(1, obj.trip_id);
    if (obj.route_id) pbf.writeStringField(5, obj.route_id);
    if (obj.direction_id) pbf.writeVarintField(6, obj.direction_id);
    if (obj.start_time) pbf.writeStringField(2, obj.start_time);
    if (obj.start_date) pbf.writeStringField(3, obj.start_date);
    if (obj.schedule_relationship) pbf.writeVarintField(4, obj.schedule_relationship);
};

TripDescriptor.ScheduleRelationship = {
    "SCHEDULED": {
        "value": 0,
        "options": {}
    },
    "ADDED": {
        "value": 1,
        "options": {}
    },
    "UNSCHEDULED": {
        "value": 2,
        "options": {}
    },
    "CANCELED": {
        "value": 3,
        "options": {}
    },
    "REPLACEMENT": {
        "value": 5,
        "options": {
            "deprecated": "true"
        }
    },
    "DUPLICATED": {
        "value": 6,
        "options": {}
    },
    "DELETED": {
        "value": 7,
        "options": {}
    }
};

// VehicleDescriptor ========================================

var VehicleDescriptor = {};

VehicleDescriptor.read = function (pbf, end) {
    return pbf.readFields(VehicleDescriptor._readField, {id: "", label: "", license_plate: "", wheelchair_accessible: {"value":0,"options":{}}}, end);
};
VehicleDescriptor._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.id = pbf.readString();
    else if (tag === 2) obj.label = pbf.readString();
    else if (tag === 3) obj.license_plate = pbf.readString();
    else if (tag === 4) obj.wheelchair_accessible = pbf.readVarint();
};
VehicleDescriptor.write = function (obj, pbf) {
    if (obj.id) pbf.writeStringField(1, obj.id);
    if (obj.label) pbf.writeStringField(2, obj.label);
    if (obj.license_plate) pbf.writeStringField(3, obj.license_plate);
    if (obj.wheelchair_accessible != undefined && obj.wheelchair_accessible !== {"value":0,"options":{}}) pbf.writeVarintField(4, obj.wheelchair_accessible);
};

VehicleDescriptor.WheelchairAccessible = {
    "NO_VALUE": {
        "value": 0,
        "options": {}
    },
    "UNKNOWN": {
        "value": 1,
        "options": {}
    },
    "WHEELCHAIR_ACCESSIBLE": {
        "value": 2,
        "options": {}
    },
    "WHEELCHAIR_INACCESSIBLE": {
        "value": 3,
        "options": {}
    }
};

// EntitySelector ========================================

var EntitySelector = {};

EntitySelector.read = function (pbf, end) {
    return pbf.readFields(EntitySelector._readField, {agency_id: "", route_id: "", route_type: 0, trip: null, stop_id: "", direction_id: 0}, end);
};
EntitySelector._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.agency_id = pbf.readString();
    else if (tag === 2) obj.route_id = pbf.readString();
    else if (tag === 3) obj.route_type = pbf.readVarint(true);
    else if (tag === 4) obj.trip = TripDescriptor.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 5) obj.stop_id = pbf.readString();
    else if (tag === 6) obj.direction_id = pbf.readVarint();
};
EntitySelector.write = function (obj, pbf) {
    if (obj.agency_id) pbf.writeStringField(1, obj.agency_id);
    if (obj.route_id) pbf.writeStringField(2, obj.route_id);
    if (obj.route_type) pbf.writeVarintField(3, obj.route_type);
    if (obj.trip) pbf.writeMessage(4, TripDescriptor.write, obj.trip);
    if (obj.stop_id) pbf.writeStringField(5, obj.stop_id);
    if (obj.direction_id) pbf.writeVarintField(6, obj.direction_id);
};

// TranslatedString ========================================

var TranslatedString = {};

TranslatedString.read = function (pbf, end) {
    return pbf.readFields(TranslatedString._readField, {translation: []}, end);
};
TranslatedString._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.translation.push(TranslatedString.Translation.read(pbf, pbf.readVarint() + pbf.pos));
};
TranslatedString.write = function (obj, pbf) {
    if (obj.translation) for (var i = 0; i < obj.translation.length; i++) pbf.writeMessage(1, TranslatedString.Translation.write, obj.translation[i]);
};

// TranslatedString.Translation ========================================

TranslatedString.Translation = {};

TranslatedString.Translation.read = function (pbf, end) {
    return pbf.readFields(TranslatedString.Translation._readField, {text: "", language: ""}, end);
};
TranslatedString.Translation._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.text = pbf.readString();
    else if (tag === 2) obj.language = pbf.readString();
};
TranslatedString.Translation.write = function (obj, pbf) {
    if (obj.text) pbf.writeStringField(1, obj.text);
    if (obj.language) pbf.writeStringField(2, obj.language);
};

// TranslatedImage ========================================

var TranslatedImage = {};

TranslatedImage.read = function (pbf, end) {
    return pbf.readFields(TranslatedImage._readField, {localized_image: []}, end);
};
TranslatedImage._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.localized_image.push(TranslatedImage.LocalizedImage.read(pbf, pbf.readVarint() + pbf.pos));
};
TranslatedImage.write = function (obj, pbf) {
    if (obj.localized_image) for (var i = 0; i < obj.localized_image.length; i++) pbf.writeMessage(1, TranslatedImage.LocalizedImage.write, obj.localized_image[i]);
};

// TranslatedImage.LocalizedImage ========================================

TranslatedImage.LocalizedImage = {};

TranslatedImage.LocalizedImage.read = function (pbf, end) {
    return pbf.readFields(TranslatedImage.LocalizedImage._readField, {url: "", media_type: "", language: ""}, end);
};
TranslatedImage.LocalizedImage._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.url = pbf.readString();
    else if (tag === 2) obj.media_type = pbf.readString();
    else if (tag === 3) obj.language = pbf.readString();
};
TranslatedImage.LocalizedImage.write = function (obj, pbf) {
    if (obj.url) pbf.writeStringField(1, obj.url);
    if (obj.media_type) pbf.writeStringField(2, obj.media_type);
    if (obj.language) pbf.writeStringField(3, obj.language);
};

// Shape ========================================

var Shape = {};

Shape.read = function (pbf, end) {
    return pbf.readFields(Shape._readField, {shape_id: "", encoded_polyline: ""}, end);
};
Shape._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.shape_id = pbf.readString();
    else if (tag === 2) obj.encoded_polyline = pbf.readString();
};
Shape.write = function (obj, pbf) {
    if (obj.shape_id) pbf.writeStringField(1, obj.shape_id);
    if (obj.encoded_polyline) pbf.writeStringField(2, obj.encoded_polyline);
};

export {
    FeedMessage
}