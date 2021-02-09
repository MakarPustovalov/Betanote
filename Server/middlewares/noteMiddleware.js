const { BadRequestError } = require("../errors/Errors")

const noteMW = (req, res, next) => {
  try {
    if(req.method === "OPTIONS") {
      next()
    }

    let note = req.body.note

    if(!note) return next(new BadRequestError('Invalid note'))

    note.userId = req.data.userId

    req.data.note = note

    next()

  } catch (error) {
    return next(error)
  }
}

module.exports = noteMW