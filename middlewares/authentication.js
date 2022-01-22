const User = require('../models/User')
const { BadRequest } = require('../errors/index');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new BadRequest('Not authorized to access this resource');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.decode(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId, name: payload.name };
        next()
    } catch (error) {
        throw new BadRequest('Not authorized to access this resource')
    }
}

module.exports = auth