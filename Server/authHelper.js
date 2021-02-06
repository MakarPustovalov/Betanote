const jwt = require('jsonwebtoken')
const config = require('./config')
const Token = require('./models/Token')

const createAccessToken = user => {
  try {

    const payload = {
      type: 'access',
      id: user._id,
    }
  
    return jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: "10m"
    })
    
  } catch (error) {
    throw new Error(error)
  }
}

const verifyAccessToken = token => {
  try {

    const payload = jwt.verify(token, config.jwt.accessSecret)
    if ((!payload) || (!(payload.type === 'access'))) throw new Error('Invalid token')
    return payload
    
  } catch (error) {
    throw new Error(error)
  }
}

async function createRefreshtoken (user) {
  try {

    const payload = {
      type: 'refresh',
      id: user._id,
    }
  
    const token = jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: "30d"
    })
    
    let newToken = await Token.findOneAndUpdate({userId: user._id}, {token}, {new: true, useFindAndModify: false})
    if (!newToken) {
      const token = new Token({
        userId: user._id, token
      })

      newToken = await token.save()
    }

    return newToken.token
    
  } catch (error) {
    throw new Error(error)
  }
}

async function verifyRefreshToken (refreshToken) {
  try {
    
    const payload = jwt.verify(refreshToken, config.jwt.refreshSecret)
    if(!(payload) || !(payload.type === 'refresh')) throw new Error('Invalid refresh token')

    const token = await Token.findOne({userId: payload.id})
    if(!token) throw new Error('Invalid refresh token')

    return payload

  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createAccessToken,
  verifyAccessToken,
  createRefreshtoken,
  verifyRefreshToken
}