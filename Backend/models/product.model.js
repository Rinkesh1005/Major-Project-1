const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    originalPrice: Number,
    discount: String,
    rating: Number,
    category: String,
    image: String,
    sizes: [String],
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
