const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  customer_name: { type: String },
  customer_phone: { type: Number },
  district: { type: String },
  address: { type: String },
  insert_date: { type: Date, default: Date.now },
  probabel_install_date: { type: Date },
  commnets: { type: String },
  state: { type: String },
  is_complete: { type: Boolean, default: false },
});

userSchema.index({ customer_phone: 1 });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
