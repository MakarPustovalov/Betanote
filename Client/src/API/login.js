import config from '../config'

export default async function login(username, password) {
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

    if(response.ok) result.ok = true

    return result
    
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Server connection error'
    }
  }
}