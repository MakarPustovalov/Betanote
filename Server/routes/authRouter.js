const router = require('express').Router()
const AuthController = require('../controllers/AuthController')
const { check } = require('express-validator')

router.get('/', (req, res) => {
  res.json({message: 'Auth endpoint'})
})

router.post('/register', [
  check('password', "Password can't be shorter than 5 symbols nor longer than 30 symbols").isLength({min: 5, max: 30}),
  check('username', "Username can't be shorter than 5 symbols nor longer than 30 symbols").isLength({min: 5, max: 30})
], AuthController.register)

router.post('/login', AuthController.login)

router.post('/refresh', AuthController.refreshTokens)

router.post('/logout', AuthController.logout)

module.exports = router