const User = require('./models/User')
const bcrypt = require('bcrypt')

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

      return res.json({message: 'login'})
      
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = new AuthController()