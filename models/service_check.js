const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceCheckSchema = new Schema({
  device_id: { type: String },
  reg_no: { type: String },
  customer_number: { type: String },
  address: { type: String },
  district: { type: String },
  problems: { type: String },
  service_fee: { type: Number },
  probable_install_date: { type: Date },
  insert_date: { type: Date, default: Date.now },
  is_complete: { type: Boolean, default: false },
});

serviceCheckSchema.index({ reg_no: 1 });

module.exports =
  mongoose.models.ServiceCheck ||
  mongoose.model("ServiceCheck", serviceCheckSchema);
