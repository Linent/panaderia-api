const mongoose = require('mongoose');

const CourtesySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  //givenBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Courtesy', CourtesySchema);

