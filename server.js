const express = require('express');
require('dotenv').config()
const connectDB = require('./db/connect')
const app = express();
require('express-async-errors')

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//security packages
const cors = require('cors');
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

//custom middlewares
const errorHandlerMiddleware = require('./middlewares/error-handler')
const authorizeUser = require('./middlewares/authentication')

app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 200
}))
app.use(helmet())
app.use(cors())
app.use(xss())

//routes
const cardsRoute = require('./routes/cards')
app.use('/api/v1/cards', cardsRoute)

const reviews = require('./routes/reviews')
app.use('/api/v1/reviews', authorizeUser, reviews)

const cart = require('./routes/cart')
app.use('/api/v1/cart', authorizeUser, cart)

const authRoute = require('./routes/auth')
app.use('/api/v1/auth', authRoute)

//404
const notFound = require('./middlewares/not-found')
app.use(notFound)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server is running on port:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()
