import config from '../config'

export default async function refreshTokens() {
  try {
    
    const response = await fetch(config.API_ROUTE + 'auth/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
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