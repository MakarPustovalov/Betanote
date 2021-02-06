const router = require('express').Router()
const AuthController = require('../AuthController')

router.get('/', (req, res) => {
  res.json({message: 'Auth endpoint'})
})

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/refresh', AuthController.refreshTokens)

module.exports = router