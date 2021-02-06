class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
    this.status = 404
    this.message = message
  }

  logStack() {
    console.error(this.stack)
  }
}

class DBError extends Error {
  constructor(message) {
    super(message)
    this.name = 'DBError'
    this.status = 500
    this.message = message
  }

  logStack() {
    console.error(this.stack)
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ServerError'
    this.status = 500
    this.message = message
  }

  logStack() {
    console.error(this.stack)
  }
}

class UnathorizedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UnathorizedError'
    this.status = 401
    this.message = message
  }

  logStack() {
    console.error(this.stack)
  }
}

class ExpiredTokenError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ExpiredTokenError'
    this.status = 401
    this.message = message
  }

  logStack() {
    console.error(this.stack)
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'BadRequestError'
    this.status = 400
    this.message = message
  }

  logStack() {
    console.error(this.stack)
  }
}

module.exports = {
  NotFoundError,
  DBError,
  ServerError,
  UnathorizedError,
  ExpiredTokenError,
  BadRequestError
}