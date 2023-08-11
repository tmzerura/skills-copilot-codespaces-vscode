// create web server
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// create express app
const app = express()
// morgan is used for logging request details
app.use(morgan('combined'))
// body parser is used to parse the request body and
// attach it to req.body
app.use(bodyParser.json())
// cors is used to allow cross-origin requests
app.use(cors())
// define port
const port = process.env.PORT || 8081
// run server
app.listen(port)
console.log(`Server listening at ${port}`)
// define comment data
const comments = [
  { username: 'alice', body: 'first comment' },
  { username: 'bob', body: 'another comment' }
]
// define api endpoints
app.get('/comments', (req, res) => {
  res.send(comments)
})
app.post('/comments', (req, res) => {
  const comment = req.body
  comments.push(comment)
  res.send(comment)
})