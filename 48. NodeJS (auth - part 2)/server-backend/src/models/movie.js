const movieSchema = require("../schemas/movie");
const mongoose = require("mongoose");

const Movie = mongoose.model("Movies", movieSchema);

module.exports = Movie;
