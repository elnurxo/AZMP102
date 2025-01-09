const { app, configureApp } = require("./src/app");
const connectToDb = require("./src/config/db");
const validateHero = require("./src/middlewares/heroValidator");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

configureApp();
connectToDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
