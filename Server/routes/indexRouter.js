const authMW = require('../middlewares/authMiddleware')
const router = require('express').Router()

router.get('/info', authMW, (req, res) => {
  return res.json({message: req.data})
})

module.exports = router