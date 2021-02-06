const jwt = require('jsonwebtoken')
const config = require('./config')

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

module.exports = {
  createAccessToken,
  verifyAccessToken
}