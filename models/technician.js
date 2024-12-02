const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const technicianSchema = new Schema({
  tech_name: { type: String },
  tech_phone: { type: Number },
  district: { type: String },
  address: { type: String },
});

technicianSchema.index({ tech_phone: 1 });

module.exports =
  mongoose.models.Technician || mongoose.model("Technician", technicianSchema);
