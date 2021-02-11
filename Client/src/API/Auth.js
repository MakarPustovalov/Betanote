import config from '../config'

export async function login(username, password) {
  try {
    
    let payload = {
      username,
      password
    }

    payload = JSON.stringify(payload)
    
    const response = await fetch(config.API_ROUTE + 'auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: payload
    })

    let result = await response.json();

    response.ok ? result.ok = true : result.ok = false

    return result
    
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Server connection error'
    }
  }
}

export async function logout() {
  try {

    const response = await fetch(config.API_ROUTE + 'auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })

    let result = await response.json();

    response.ok ? result.ok = true : result.ok = false

    return result
    
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Server connection error'
    }
  }
}

export async function refreshTokens() {
  try {
    
    const response = await fetch(config.API_ROUTE + 'auth/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })

    let result = await response.json();

    response.ok ? result.ok = true : result.ok = false

    return result
    
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Server connection error'
    }
  }
}

export async function register(username, password) {
  try {
    
    let payload = {
      username,
      password
    }

    payload = JSON.stringify(payload)
    
    const response = await fetch(config.API_ROUTE + 'auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: payload
    })

    let result = await response.json();

    response.ok ? result.ok = true : result.ok = false

    return result
    
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Server connection error'
    }
  }
}