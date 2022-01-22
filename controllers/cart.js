const Cart = require('../models/Cart')
const Card = require('../models/Card')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors/index')

const getUsersCart = async (req, res) => {
    const cart = await Cart.find({ addedBy: req.user.userId })
    const added = cart.map((item) => item.added)
    const card = await Card.find({ _id: { $in: added } })
    res.status(StatusCodes.OK).json({ card, amount: cart.length })
}

const removeItemFromCart = async (req, res) => {
    const { itemId } = req.body;
    const cart = await Cart.findOneAndDelete({ addedBy: req.user.userId, added: itemId })
    if (!cart) {
        throw new NotFoundError('Cannot find item')
    }
    res.status(StatusCodes.OK).json({ msg: 'Item purchased' })
}

const addToCart = async (req, res) => {
    req.body.addedBy = req.user.userId
    const cart = await Cart.create(req.body)
    res.status(StatusCodes.CREATED).json({ cart, msg: 'Item has been successfully added to your cart' })
}

module.exports = { getUsersCart, addToCart, removeItemFromCart }