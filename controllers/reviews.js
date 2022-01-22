const { BadRequest } = require('../errors/index')
const Reviews = require('../models/Reviews')


const handleExtenders = (extender) => {
    return extender.split(',').join(' ')
}

const getAllReviews = async (req, res) => {
    const { field, name, rating } = req.query;
    const queryObject = {}
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    if (rating) {
        queryObject.rating = Number(rating)
    }
    let result = Reviews.find(queryObject).sort('-createdAt')
    if (field) {
        result = result.select(handleExtenders(field))
    }
    const reviews = await result
    res.status(200).json({ reviews, amount: reviews.length })
}

const postReview = async (req, res) => {
    const { content, rating } = req.body;
    req.body.createdBy = req.user.userId
    req.body.name = req.user.name
    if (!content || !rating) {
        throw new BadRequest('Please provide content and rating')
    }
    const reviews = await Reviews.create(req.body)
    res.status(200).json({ reviews })
}

module.exports = { getAllReviews, postReview }