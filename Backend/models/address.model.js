const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
