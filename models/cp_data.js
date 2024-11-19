const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cpdataSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  RECORD_ID: { type: Number },
  PROVIDER: { type: String },
  BOX_ID: { type: String },
  LICENSE_PLATE: { type: String },
  PROVINCE: { type: String },

  SENT_DATE_TIME: { type: Date },
  GPS_DATE_TIME: { type: Date },
  LATITUDE: { type: Number },
  LONGITUDE: { type: Number },
  SPEED: { type: Number },
  DIRECTION: { type: Number },
  GPS_FIX: { type: Number },
  TEMP: { type: Number },
  DRIVING_STATUS: { type: String },
  VEHICLE_IO_STATUS: { type: String },
  VEHICLE_PARKING: { type: String },
  OVER_SPEED: { type: String },
  PTO_IO_STATUS: { type: String },
  GPS_IO_STATUS: { type: String },
  GPS_RESET_BOX: { type: String },
  MILAGE: { type: Number },
});

cpdataSchema.index({ BOX_ID: 1 });

module.exports = mongoose.model("Cpdata", cpdataSchema);
