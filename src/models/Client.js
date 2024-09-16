const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    address: {
        type: String
    }
},
{
  timestamps: true // Habilita 'createdAt' y 'updatedAt'
}
);

module.exports = mongoose.model('Client', clientSchema);