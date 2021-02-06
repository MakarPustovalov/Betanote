const User = require('./models/User')
const bcrypt = require('bcrypt')
const {
  createAccessToken
} = require('./authHelper')

class AuthController {

  async register (req, res, next) {
    try {
      const {username, password} = req.body

      let user = await User.findOne({username: username})
      if (user) return res.status(400).json({message: 'This user already exists'})

      const hashedPassword = bcrypt.hashSync(password, 7)
      user = new User({
        username, password: hashedPassword
      })

      await user.save()

      return res.json({message: 'User created'})
      
    } catch (error) {
      return next(error)
    }
  }

  async login (req, res, next) {
    try {

      const {username, password} = req.body

      let user = await User.findOne({username: username})
      if (!user) return res.status(404).json({message: 'User not found'})

      const isPasswordCorrect = bcrypt.compareSync(password, user.password)
      if (!isPasswordCorrect) return res.status(400).json({message: 'Password is not correct'})

      const accessToken = createAccessToken(user)

      return res.cookie('accessToken', accessToken, {
        maxAge: 900000,
        httpOnly: true,
        signed: true,
        domain: process.env.MODE === 'production' ? '' : 'localhost',
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production' ? true : false
      }).json({message: 'Logged in'})
      
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new AuthController()