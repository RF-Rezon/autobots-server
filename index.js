const express = require('express')
require('dotenv').config();
var cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000;

console.log(process.env.PORT)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})