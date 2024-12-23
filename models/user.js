const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  customer_name: { type: String },
  customer_phone: { type: String },
  district: { type: String },
  address: { type: String },
  install_date: { type: Date },
  reference: { type: String },
  comments: { type: String },
  state: { type: String },
  device_price: { type: Number },
  service_charge: { type: Number },
  quantity: { type: Number, default: 1 },
  probabel_install_date: { type: Date },
  insert_date: { type: Date, default: Date.now },
  is_complete: { type: Boolean, default: false },
});

userSchema.index({ customer_phone: 1 });

userSchema.pre("save", function (next) {
  if (this.is_complete && !this.install_date) {
    this.install_date = new Date();
  } else if (!this.is_complete) {
    this.install_date = undefined;
  }
  next();
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
