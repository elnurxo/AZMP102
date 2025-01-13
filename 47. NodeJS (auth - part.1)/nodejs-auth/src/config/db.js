const mongoose = require("mongoose");
require("dotenv").config();
const CONNECTION_URL = process.env.MONGO_CONNECTION_STRING;
const DB_USERNAME = process.env.MONGO_DB_USERNAME;
const DB_PASSWORD = process.env.MONGO_DB_PASSWORD;

const connectToDb = async () => {
  mongoose
    .connect(
      CONNECTION_URL.replace("<db_username>", DB_USERNAME).replace(
        "<db_password>",
        DB_PASSWORD
      )
    )
    .then(() => {
      console.log("Connected to DB successfully");
    })
    .catch((err) => {
      console.log("DB ERROR: ", err);
    });
};

module.exports = connectToDb;
