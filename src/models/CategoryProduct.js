const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  // Cada categoría debe ser única
  },
  description: {
    type: String,
    required: false
  },
}, {
  timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;