const { BadRequestError, NotFoundError } = require('../errors/Errors')
const Note = require('../models/Note')

// req.body.note should be = {
//   userId: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   tag: {
//     type: String,
//   },
//   _id: ObjectID
// }

class NoteController {

  async getNoteList (req, res, next) {
    try {
      const userId = req.data.userId
      const noteList = await Note.find({userId})
      return res.json({message: 'Note list', auth: true, noteList})
      
    } catch (error) {
      return next(error)
    }
  }

  async getNote (req, res, next) {
    try {

      let rawNote = req.data.note

      const note = await Note.findOne({_id: rawNote._id, userId: rawNote.userId})
      if(!note) return next(new NotFoundError('Note with this ID does not exist'))
      return res.json({message: 'Found note', note, auth: true})

    } catch (error) {
      return next(error)
    }
  }

  async writeNote (req, res, next) {
    try {

      let rawNote = req.data.note

      if (rawNote._id) {

        const newNote = await Note.findOneAndUpdate({_id: rawNote._id, userId: rawNote.userId}, {...rawNote}, {new: true, useFindAndModify: false})
        if (newNote) return res.json({message: 'Successfully saved note', noteId: newNote._id, auth: true})
        return next(new BadRequestError("Note with this ID doesn't exist or you haven't permission"))

      } else {

        const existingNote = await Note.findOne({...rawNote})
        if (existingNote) return next(new BadRequestError('This note already exists and noteID is not provided'))

        let newNote = new Note({
          ...rawNote
        })

        newNote = await newNote.save()
        return res.json({message: 'Successfully saved note', noteId: newNote._id, auth: true})

      }
      
    } catch (error) {
      if (error.message && error.message.includes('Cast')) return next(new BadRequestError('Invalid note id'))
      if (error._message && error._message.includes('validation')) return next(new BadRequestError('Invalid note'))
      return next(error)
    }
  }

}

module.exports = new NoteController()