const { StatusCodes } = require('http-status-codes')
const { CustomAPIError } = require('../errors/index')
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER,
        msg: err.message || 'Something went wrong please try again later'
    }
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
        customError.statusCode = StatusCodes.BAD_REQUEST;

    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate for ${Object.keys(err.keyValue)} field`
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.name === 'CastError') {
        customError.msg = `No item with the id of ${err.value}`
        customError.statusCode = StatusCodes.NOT_FOUND;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg })
    //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware