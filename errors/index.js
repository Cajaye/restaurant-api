const CustomAPIError = require('./custom-error')
const BadRequest = require('./bad-request.js')
const UnauthorizedError = require('./unauthorized')
const NotFoundError = require('./notFound')

module.exports = { CustomAPIError, BadRequest, UnauthorizedError, NotFoundError }