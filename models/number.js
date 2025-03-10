const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const numberSchema = new Schema({
  number: { type: String },
  kcp_number: { type: String },
  active_date: { type: Date },
  is_active: { type: Boolean, default: true },
});

numberSchema.index({ number: 1 });

module.exports =
  mongoose.models.Number || mongoose.model("Number", numberSchema);
