const express = require('express')
const config = require('./config')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const indexRouter = require('./routes/indexRouter')
const authRouter = require('./routes/authRouter')
const mongoose = require('mongoose')
const { AuthError } = require('./errors/Errors')

const app = express()

const PORT = process.env.PORT || config.port

app.use(cors(config.cors))

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(cookieParser(config.cookieSecret))

app.use((req, res, next) => {
  console.log(req.url, req.method)
  next()
})

app.use('/auth', authRouter)
app.use('', indexRouter)

app.use((err, req, res, next) => {
  console.error(err)
  let auth = err.auth
  if (auth === undefined) auth = true
  if (err instanceof AuthError) auth = false //Checking if error caused by authentification
  res.status(err.status || 400).json({message: err.message, error: err, auth})
})

const start = () => {
  try {
    mongoose.connect(config.mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT)
    })
  } catch (error) {
    console.log(error)
  }
}

start()