const { userSchema } = require("../schemas/user");
const mongoose = require("mongoose");

//create a model for the user schema
const User = mongoose.model("User", userSchema);

module.exports = User;
