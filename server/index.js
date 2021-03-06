const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = 3000
const movierouter  = require('./routes/movie-router')
const db = require('./db')

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error'))
console.log('connected to database')

app.use('/api',movierouter)

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})

