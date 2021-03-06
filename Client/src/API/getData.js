import config from '../config'
import { refreshTokens } from './Auth'

export default async function getData(url) {
  try {
    
    const response = await fetch(config.API_ROUTE + url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })

    let result = await response.json();

    //Checking if token expired (ExpiredTokenError 401)

    if (response.ok) {
      result.ok = true
    } else {

      if (result.error) {

        if (result.error.name === 'ExpiredTokenError') {

          const refresh = await refreshTokens()
          if (refresh.ok) {
    
            const response = await fetch(config.API_ROUTE + url, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            })
        
            const result = await response.json();

            response.ok ? result.ok = true : result.ok = false

            return result

          }

        }

      }
      
      result.ok = false
    }

    //result errors:
    // DBError 500
    // ServerError 500
    // UnathorizedError 401
    // NotFoundError 404
    // BadRequestError 400

    // result.error = {
    //    name: String,
    //    status: Number  
    // }
    
    return result

  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Server connection error'
    }
  }
}