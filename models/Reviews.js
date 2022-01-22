const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'Please provide rating'],
        enum: [5, 4, 3, 2, 1]
    },
    content: {
        type: String,
        trim: true,
        required: [true, 'Please provide content']
    },
    date: {
        type: String,
        default: new Date().toDateString()
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: [true, "Provide a user"]
    }
}, { timestamps: true })

module.exports = mongoose.model('Review', ReviewSchema)