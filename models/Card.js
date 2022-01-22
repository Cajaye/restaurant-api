const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 1,
        min: 1,
        max: [20, 'You have reached the mximum amount of items'],
        required: true
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: true
    }
})

module.exports = mongoose.model('Card', CardSchema)