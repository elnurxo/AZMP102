const Movie = require("../models/movie");

//get All
const getAll = async function (req, res) {
  try {
    const { title } = req.query;
    const movies = await Movie.find({
      title: { $regex: title || "", $options: "i" },
    });

    if (movies.length === 0) {
      return res.status(404).json({
        data: [],
        message: "movies not found",
        status: "fail",
      });
    }

    return res.status(200).json({
      movies: movies,
      message: "movies retrieved successfully!",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message ? error.message : "Internal server error",
      status: "fail",
    });
  }
};

//get One
const getOne = async function (req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json({
        movie: {},
        message: "id not provided",
        status: "fail",
      });
    }
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        data: {},
        message: "movie not found",
        status: "fail",
      });
    }

    return res.status(200).json({
      movies: movie,
      message: "movie retrieved successfully!",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message ? error.message : "Internal server error",
      status: "fail",
    });
  }
};

//post
const post = async function (req, res) {
  const { title, description, year, imageURL } = req.body;

  if (!title || !description || !year || !imageURL) {
    return res.status(401).json({
      message: "all fields are required!",
      status: "fail",
    });
  }

  const newMovie = new Movie({
    title,
    description,
    year,
    imageURL,
  });

  await newMovie.save();

  return res.status(200).json({
    data: newMovie,
    message: "movie posted successfully!",
    status: "success",
  });
};

//delete
const deleteOne = async function (req, res) {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({
        message: "movie not found",
        status: "fail",
      });
    }

    return res.status(200).json({
      data: deletedMovie,
      message: "movie deleted successfully!",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message ? error.message : "Internal server error",
      status: "fail",
    });
  }
};

//update ?
const update = async function (req, res) {
  try {
    const { id } = req.params;
    const updatingMovie = await Movie.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatingMovie) {
      return res.status(404).json({
        data: {},
        message: "movie not found",
        status: "fail",
      });
    }
    return res.status(200).json({
      data: updatingMovie,
      message: "movie updated successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message ? error.message : "Internal server error",
      status: "fail",
    });
  }
};

module.exports = { getAll, getOne, post, deleteOne, update };
