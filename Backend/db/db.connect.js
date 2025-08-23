const mongoose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGODB;

const initialiseDatabase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Database successfully connected.");
    })
    .catch((error) => {
      console.error(error.message);
      console.log("Error in connecting to database.");
    });
};

module.exports = { initialiseDatabase };
