import React from 'react'
import plus from '../../Assets/img/plus.svg'

function NoteList({notes, noteClickHandler, createNewNote, currentTag, tagClickHandler}){
  return(
    <div className="sidebar__notes">

      <div onClick={createNewNote} className="sidebar__note sidebar__note-add">
        <span className="sidebar__note-text">Add new note...</span>
        <img src={plus} alt="Add" />
      </div>

      {
        currentTag === '' ? //if current tag not specified (no searching by tag)
        
        notes.map(element => {
          return (

            <div
              key={element._id}
              id={element._id} 
              className="sidebar__note animate__animated animate__fadeIn"
              onClick={noteClickHandler}
            >

              <span className="sidebar__note-text">{element.description}</span>

              {element.tag !== '' ? 
                <div
                  id={element.tag}
                  className="sidebar__tag"
                  onClick={tagClickHandler}
                >
                  <div className="sidebar__tag-circle"></div>
                  <span className="sidebar__tag-text">{element.tag}</span>
                </div>
                : false  
              }

            </div>

          )
        })

        : //display notes with tag which is being searched

        notes.map(element => {
          if (element.tag === currentTag) {
            return (

              <div
                key={element._id}
                id={element._id} 
                className="sidebar__note animate__animated animate__fadeIn"
                onClick={noteClickHandler}
              >

                <span className="sidebar__note-text">{element.description}</span>

                {element.tag !== '' ? 
                  <div
                    id={element.tag}
                    className="sidebar__tag"
                    onClick={tagClickHandler}
                  >
                    <div className="sidebar__tag-circle"></div>
                    <span className="sidebar__tag-text">{element.tag}</span>
                  </div>
                  : false  
                }

              </div>

            )
          }
          return false
        })

      }

    </div>
  )
}

export default NoteList;