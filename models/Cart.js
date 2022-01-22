const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    added: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: [true, 'Item already exists']
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        default: 1,
        max: [30, 'Cannot order more than 30'],
        min: 1
    }
})

module.exports = mongoose.model('Cart', CartSchema)