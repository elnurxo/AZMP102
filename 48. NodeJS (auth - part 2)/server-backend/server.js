const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3030;
const cors = require("cors");
const router = require("./src/routes/movieRoute");
const startDatabase = require("./src/config/db");

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/movies", router);

//connect to DB
startDatabase();
//app listen
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
