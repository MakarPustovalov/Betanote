const User = require('../models/User')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const {
  createAccessToken,
  createRefreshtoken,
  verifyAccessToken,
  verifyRefreshToken
} = require('../helpers/authHelper')
const { BadAuthRequestError, ServerError, UnathorizedError } = require('../errors/Errors')
const config = require('../config')

class AuthController {

  async register (req, res, next) {
    try {

      const errors = validationResult(req)

      if(!errors.isEmpty()) {
        return next(new BadAuthRequestError('Incorrect login or password'))
      }

      const {username, password} = req.body

      let user = await User.findOne({username: username})
      if (user) return next(new BadAuthRequestError('User already exists'))

      const hashedPassword = bcrypt.hashSync(password, 7)
      user = new User({
        username, password: hashedPassword
      })

      await user.save()

      const accessToken = createAccessToken(user)
      const refreshToken = await createRefreshtoken(user)

      if (!(accessToken) || !(refreshToken)) {
        return next(new ServerError('Internal server error'))
      }

      return res.cookie('accessToken', accessToken, {
        maxAge: 900000,
        httpOnly: true,
        signed: true,
        domain: config.domain,
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production' ? true : false
      }).cookie('refreshToken', refreshToken, {
        maxAge: 2592000000,
        httpOnly: true,
        signed: true,
        domain: config.domain,
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production' ? true : false
      }).json({message: 'Registered', auth: true})
      
    } catch (error) {
      return next(error)
    }
  }

  async login (req, res, next) {
    try {

      const {username, password} = req.body

      let user = await User.findOne({username: username})
      if (!user) return next(new BadAuthRequestError('This user does not exists'))

      const isPasswordCorrect = bcrypt.compareSync(password, user.password)
      if (!isPasswordCorrect) return next(new BadAuthRequestError('Password is not correct'))

      const accessToken = createAccessToken(user)
      const refreshToken = await createRefreshtoken(user)

      if (!(accessToken) || !(refreshToken)) {
        return next(new ServerError('Internal server error'))
      }

      return res.cookie('accessToken', accessToken, {
        maxAge: 900000,
        httpOnly: true,
        signed: true,
        domain: config.domain,
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production' ? true : false
      }).cookie('refreshToken', refreshToken, {
        maxAge: 2592000000,
        httpOnly: true,
        signed: true,
        domain: config.domain,
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production' ? true : false
      }).json({message: 'Logged in', auth: true})
      
    } catch (error) {
      return next(error)
    }
  }

  async refreshTokens (req, res, next) {
    try {
    
      const currentRefreshToken = req.signedCookies.refreshToken
  
      if(!currentRefreshToken) return next(new UnathorizedError('Not logged in'))
  
      const payload = await verifyRefreshToken(currentRefreshToken)
      if(!payload) return next(new UnathorizedError('Not logged in'))

      const user = await User.findOne({_id: payload.id})

      if (!user) return next(new BadAuthRequestError('User not found'))

      const accessToken = createAccessToken(user)
      const refreshToken = await createRefreshtoken(user)

      if (!(accessToken) || !(refreshToken)) {
        return next(new ServerError('Internal server error'))
      }

      return res.cookie('accessToken', accessToken, {
        maxAge: 900000,
        httpOnly: true,
        signed: true,
        domain: config.domain,
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production' ? true : false
      }).cookie('refreshToken', refreshToken, {
        maxAge: 2592000000,
        httpOnly: true,
        signed: true,
        domain: config.domain,
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production' ? true : false
      }).json({message: 'Refreshed tokens', auth: true})
      
    } catch (error) {
      next(error)
    }
  }

  async logout (req, res, next) {
    try {

      return res.cookie('accessToken', '', {
        maxAge: 1,
        httpOnly: true,
        signed: true,
        domain: config.domain,
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production' ? true : false
      }).cookie('refreshToken', '', {
        maxAge: 1,
        httpOnly: true,
        signed: true,
        domain: config.domain,
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production' ? true : false
      }).json({message: 'Logged out', auth: false})
      
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new AuthController()