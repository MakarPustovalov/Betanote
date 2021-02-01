const { Schema, model } = require('mongoose')

consttokenrSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true,
  }
})

const Token = model("Token", tokenSchema)

module.exports = Token