const { sliders } = require("../models/sliders");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const getAll = (req, res) => {
  if (sliders.length === 0) {
    res.status(404).json({
      data: [],
      message: "No sliders found",
      status: "fail",
    });
  } else {
    res.status(200).json({
      data: sliders,
      message: "Sliders retrieved successfully",
      status: "success",
    });
  }
};

const getOne = (req, res) => {
  const { id } = req.params;
  const slider = sliders.find((slider) => slider.id === id);

  if (slider) {
    res.status(200).json({
      data: slider,
      message: "Slider retrieved successfully",
      status: "success",
    });
  } else {
    res.status(404).json({
      data: null,
      message: "Slider not found",
      status: "fail",
    });
  }
};

const deleteOne = (req, res) => {
  const { id } = req.params;
  const sliderIdx = sliders.findIndex((slider) => slider.id === id);

  if (sliderIdx === -1) {
    res.status(404).json({
      data: null,
      message: "Slider not found",
      status: "fail",
    });
  } else {
    //file remove
    fs.unlinkSync(
      `./src/public/uploads/${sliders[sliderIdx].image.split("/")[4]}`
    );
    //data remove
    sliders.splice(sliderIdx, 1);
    res.status(200).json({
      data: null,
      message: "Slider deleted successfully",
      status: "success",
    });
  }
};

const post = (req, res) => {
  const { title } = req.body;
  const newSlider = {
    id: uuidv4(),
    title,
    image: "http://localhost:7070/uploads/" + req.file.filename,
  };
  sliders.push(newSlider);
  res.json({
    data: newSlider,
    message: "Slider created successfully",
    status: "success",
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { image } = req.file;
  const slider = sliders.find((slider) => slider.id === id);

  if (!slider) {
    return res.status(404).json({
      data: null,
      message: "Slider not found",
      status: "fail",
    });
  }

  slider.title = title || slider.title;
  slider.image = image || slider.image;
  if (slider.image) {
    slider.image = "http://localhost:7070/uploads/" + req.file.filename;
    fs.unlinkSync(`./src/public/uploads/${slider.image.split("/")[4]}`);
  } else {
    slider.image = slider.image;
  }

  res.status(200).json({
    data: slider,
    message: "Slider updated successfully",
    status: "success",
  });
};

module.exports = { getAll, getOne, deleteOne, post, update };
