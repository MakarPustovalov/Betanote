const authMW = require('../middlewares/authMiddleware')
const noteMW = require('../middlewares/noteMiddleware')
const router = require('express').Router()
const noteController = require('../controllers/NoteController')

router.get('/logged', authMW, (req, res) => {
  return res.json({message: 'Logged', auth: true, userdata: req.data})
})

router.get('/note-list', [authMW, noteController.getNoteList])

router.post('/write-note', [authMW, noteMW, noteController.writeNote])


module.exports = router