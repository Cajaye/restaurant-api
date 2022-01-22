const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide your first name'],
        minLength: [3, 'First name must be at least 3 characters long']
    },
    lastname: {
        type: String,
        required: [true, 'Please provide your last name'],
        minLength: [3, 'Last name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email address provide a different one'],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    }
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.firstname }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = mongoose.model('User', UserSchema)