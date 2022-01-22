const express = require('express');
const router = express.Router();

const { getAllCards, postCards } = require('../controllers/cards')

router.route('/').get(getAllCards).post(postCards)


module.exports = router