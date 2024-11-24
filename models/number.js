const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const numberSchema = new Schema({
  number: { type: String },
  active_date: { type: Date },
  is_active: { type: Boolean, default: true },
});

numberSchema.index({ number: 1 });

module.exports =
  mongoose.models.Number || mongoose.model("Number", numberSchema);

// import mongoose from "mongoose";

// const numberSchema = new mongoose.Schema({
//   number: { type: String },
//   active_date: { type: String },
//   is_active: { type: Boolean, default: true },
// });

// const Number = mongoose.models.number || mongoose.model("Number", numberSchema);

// export default Number;
