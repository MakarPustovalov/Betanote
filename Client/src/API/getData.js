import config from '../config'
import refreshTokens from './refreshTokens'

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

    console.log(result)

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

            return result

          }

        }

      }

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