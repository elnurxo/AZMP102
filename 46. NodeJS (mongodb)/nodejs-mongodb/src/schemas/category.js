//create MongoDB schema for category
const { Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    //one-to-many
    products: [{ type: Schema.Types.ObjectId, ref: "Product", default: [] }],
  },
  { timestamps: true }
);

// Static method
categorySchema.statics.isDuplicateCategory = function (name) {
  const duplicate = this.findOne({ name });
  return duplicate;
};

module.exports = { categorySchema };
