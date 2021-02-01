const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({message: 'All is ok'})
})

module.exports = router