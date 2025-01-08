const { app, configureApp } = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

configureApp();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});