// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   customer_name: { type: String },
//   customer_phone: { type: Number },
//   district: { type: String },
//   address: { type: String },
//   insert_date: { type: Date, default: Date.now },
//   probabel_install_date: { type: Date },
//   install_date: { type: Date },
//   commnets: { type: String },
//   state: { type: String },
//   is_complete: { type: Boolean, default: false },
// });

// userSchema.index({ customer_phone: 1 });

// userSchema.pre("save", function (next) {
//   if (this.is_complete) {
//     this.install_date = new Date(); // Set install_date to the current date
//   } else {
//     this.install_date = undefined; // Set install_date to undefined
//   }
//   next();
// });

// module.exports = mongoose.models.User || mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  customer_name: { type: String },
  customer_phone: { type: Number },
  district: { type: String },
  address: { type: String },
  insert_date: { type: Date, default: Date.now },
  probabel_install_date: { type: Date },
  install_date: { type: Date },
  comments: { type: String },
  state: { type: String },
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
