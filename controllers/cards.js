
const Card = require('../models/Card')
const getAllCards = async (req, res) => {
    const { featured, title, price, rating, sort, fields } = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (title) {
        queryObject.title = { $regex: title, $options: 'i' }
    }
    if (price) {
        queryObject.price = Number(price)
    }
    if (rating) {
        queryObject.rating = Number(rating)
    }
    let result = Card.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const card = await result
    res.status(200).json({ card, nbHits: card.length });
}


const postCards = async (req, res) => {
    const card = await Card.create({ ...req.body })
    res.status(201).json({ card })
}




module.exports = { getAllCards, postCards };