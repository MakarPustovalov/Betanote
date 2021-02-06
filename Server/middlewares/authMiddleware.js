const { verifyAccessToken } = require('../authHelper')

const authMW = (req, res, next) => {
  try {
    if(req.method === "OPTIONS") {
      next()
    }
    
    const { accessToken } = req.signedCookies

    if(!accessToken) return next('Not logged in')

    const payload = verifyAccessToken(accessToken)
    if (!payload) return next('Not logged in')
    req.data = {
      id: payload.id
    }
    next()

  } catch (error) {
    next(error)
  }
}

module.exports = authMW