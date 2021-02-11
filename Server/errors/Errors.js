class AuthError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthError'
    this.status = 401
    this.message = message
    this.auth = false
  }
}

class NotFoundError extends Error {
  constructor(message, auth) {
    super(message)
    this.name = 'NotFoundError'
    this.status = 404
    this.message = message
    this.auth = auth === undefined ? true : auth
  }

  logStack() {
    console.error(this.stack)
  }
}

class DBError extends Error {
  constructor(message, auth) {
    super(message)
    this.name = 'DBError'
    this.status = 500
    this.message = message
    this.auth = auth === undefined ? true : auth
  }

  logStack() {
    console.error(this.stack)
  }
}

class ServerError extends Error {
  constructor(message, auth) {
    super(message)
    this.name = 'ServerError'
    this.status = 500
    this.message = message
    this.auth = auth === undefined ? true : auth
  }

  logStack() {
    console.error(this.stack)
  }
}

class UnathorizedError extends AuthError {
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

class ExpiredTokenError extends AuthError {
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
  constructor(message, auth) {
    super(message)
    this.name = 'BadRequestError'
    this.status = 400
    this.message = message
    this.auth = auth === undefined ? true : auth
  }

  logStack() {
    console.error(this.stack)
  }
}

class BadAuthRequestError extends AuthError {
  constructor(message) {
    super(message)
    this.name = 'BadAuthRequestError'
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
  BadRequestError,
  AuthError,
  BadAuthRequestError
}