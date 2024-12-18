const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const existingClientSchema = new Schema({
  device_id: { type: Number },
  customer_phone: { type: String },
  device_phone: { type: String },
  probabel_call_date: { type: Date },
  platform: { type: String },
  comments: { type: String },
  state: { type: String },
  after_state: { type: String },
  is_complete: { type: Boolean, default: false },
});

existingClientSchema.index({ device_id: 1 });

module.exports =
  mongoose.models.ExistingClient ||
  mongoose.model("ExistingClient", existingClientSchema);
