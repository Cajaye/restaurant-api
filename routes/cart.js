const express = require('express')
const Router = express.Router()

const { getUsersCart, addToCart, removeItemFromCart } = require('../controllers/cart')

Router.route('/')
    .get(getUsersCart)
    .post(addToCart)
    .delete(removeItemFromCart)



module.exports = Router