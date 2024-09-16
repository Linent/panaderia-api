const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false
    },
    netPrice: {
      type: Number,
      required: true,
    },
    grossPrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'out_of_stock', 'discontinued'],
      default: 'active',  // Por defecto, los productos estarán activos
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',  // Referencia a la colección de categorías
      required: true,
    },
  },
  {
    timestamps: true, // Habilita 'createdAt' y 'updatedAt'
  }
);

module.exports = mongoose.model("Product", ProductSchema);
