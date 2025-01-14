const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.DB_URL;

const startDatabase = async function () {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("DB error: ", err);
    });
};

module.exports = startDatabase;
