const { Schema, model } = require('mongoose')

const tokenSchema = new Schema({
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