const authMW = require('../middlewares/authMiddleware')
const router = require('express').Router()

router.get('/logged', authMW, (req, res) => {
  return res.json({message: 'Logged', auth: true, userdata: req.data})
})

module.exports = router