require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const database = require('./config/database')
const router = require('./routes/user')


const app = express()


// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: "http://localhost:5173" }))
} else {
  app.use(cors())
}
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// CONNECT TO DATABASE
const DB_URI = process.env.NODE_DB_URI
database(DB_URI)


// AUTH ROUTES
app.use('/api', router)


// RUN SERVER
const port = process.env.NODE_DB_PORT || 3000
app.listen(port, () => console.log('Server is running on port ' + port))
