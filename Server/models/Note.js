const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  }
})

const Note = model("Note", noteSchema)

module.exports = Note