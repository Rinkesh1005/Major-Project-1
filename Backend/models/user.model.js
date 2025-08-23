const mongoose = require("mongoose");
const Address = require("./address.model");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  addresses: [Address.schema],
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
