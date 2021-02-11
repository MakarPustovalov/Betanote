const authMW = require('../middlewares/authMiddleware')
const noteMW = require('../middlewares/noteMiddleware')
const router = require('express').Router()
const noteController = require('../controllers/NoteController')

router.get('/logged', authMW, (req, res) => {
  return res.json({message: 'Logged', auth: true, userdata: req.data})
})

router.get('/note-list', [authMW, noteController.getNoteList])

router.post('/create-note', [authMW, noteMW, noteController.createNote])

router.post('/update-note', [authMW, noteMW, noteController.updateNote])

router.delete('/delete-note', [authMW, noteMW, noteController.deleteNote])


module.exports = router