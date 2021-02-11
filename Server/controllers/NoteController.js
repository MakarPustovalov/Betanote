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

  async createNote (req, res, next) {
    try {

      let rawNote = req.data.note

      if (rawNote._id) return next(new BadRequestError('New note must not have provided id'))

      if((!rawNote.description) || (!rawNote.content)) return next(new BadRequestError('Note must have description and some content'))

      let newNote = new Note({
        ...rawNote
      })

      newNote = await newNote.save()
      return res.json({message: 'Successfully created note', noteId: newNote._id, auth: true})
      
    } catch (error) {
      return next(error)
    }
  }

  async updateNote(req, res, next) {
    try {

      let rawNote = req.data.note

      if(!rawNote._id) return next(new NotFoundError('Note id is not provided'))

      if((!rawNote.description) || (!rawNote.content)) return next(new BadRequestError('Note must have description and some content'))

      const newNote = await Note.findOneAndUpdate({_id: rawNote._id, userId: rawNote.userId}, {...rawNote}, {new: true, useFindAndModify: false})
      if (!newNote) return next(new NotFoundError("Note with this ID doesn't exist"))

      res.json({message: 'Successfully updated note', noteId: newNote._id, auth: true})

    } catch (error) {
      return next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {

      let rawNote = req.data.note

      const newNote = await Note.findOneAndDelete({_id: rawNote._id, userId: rawNote.userId})
      if (newNote) return res.json({message: 'Successfully deleted note', noteId: newNote._id, auth: true})
      
      return next(new BadRequestError("Note with this ID doesn't exist or you haven't permission"))
      
    } catch (error) {
      return next(error)
    }
  }

}

module.exports = new NoteController()