const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, '/build')))
app.use("/static", express.static('./build/static/'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log('Server is listening on', PORT)
})