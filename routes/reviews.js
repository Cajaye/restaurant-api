const express = require('express')
const Router = express.Router()

const { getAllReviews, postReview } = require('../controllers/reviews')

Router.route('/').get(getAllReviews).post(postReview)

module.exports = Router