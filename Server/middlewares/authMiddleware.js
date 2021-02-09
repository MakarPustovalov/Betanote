const { verifyAccessToken } = require('../helpers/authHelper')
const { UnathorizedError, ExpiredTokenError } = require('../errors/Errors')
const jwt = require('jsonwebtoken')

const authMW = (req, res, next) => {
  try {
    if(req.method === "OPTIONS") {
      next()
    }

    const { accessToken, refreshToken } = req.signedCookies
    
    if ((!accessToken) && (!refreshToken)) {
      return next(new UnathorizedError('Not logged in'))
    }

    if ((refreshToken) && (!accessToken)) {
      return next(new ExpiredTokenError('Access token expired'))
    }

    const payload = verifyAccessToken(accessToken)

    req.data = {
      userId: payload.id,
      username: payload.username
    }
    req.isLogged = true

    next()

  } catch (error) {

    if (error instanceof jwt.TokenExpiredError) {
      return next(new ExpiredTokenError('Access token expired'))
    }

    return next(error)
  }
}

module.exports = authMW