//create MongoDB schema for product
const { Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    battery: {
      type: Number,
      default: 0,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
  },
  { timestamps: true }
);

module.exports = productSchema;
