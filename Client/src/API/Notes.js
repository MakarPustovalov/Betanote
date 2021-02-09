import config from '../config'
import { refreshTokens } from './Auth'

export async function writeNote(note) {
  try {

    if((!note) || (!note.description) || (!note.content)) return {ok: false, message: "Title nor content cannot be empty"}

    const payload = JSON.stringify({
      note
    })
    
    const response = await fetch(config.API_ROUTE + 'write-note', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: payload
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
    
            const response = await fetch(config.API_ROUTE + 'write-note', {
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

export async function deleteNote(noteId) {
  try {

    const payload = JSON.stringify({
      note: {
        _id: noteId
      }
    })
    
    const response = await fetch(config.API_ROUTE + 'delete-note', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: payload
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
    
            const response = await fetch(config.API_ROUTE + 'write-note', {
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