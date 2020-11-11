import React from 'react'
import plus from '../../Assets/img/plus.svg'

function NoteList({notes, noteClickHandler, createNewNote}){
  return(
  
    <div className="sidebar__notes">

      <div onClick={createNewNote} className="sidebar__note sidebar__note-add">
        <span className="sidebar__note-text">Add new note...</span>
        <img src={plus} alt="Add" />
      </div>

      {notes.map(element => {
        return (
          <div
          key={element.id}
          id={element.id} 
          className="sidebar__note animate__animated animate__fadeIn"
          onClick={noteClickHandler}
          >
            <span className="sidebar__note-text">{element.description}</span>
            {element.tag !== '' ? 
            <div className="sidebar__tag" onClick={(event) => {event.stopPropagation()}}>
              <div className="sidebar__tag-circle"></div>
              <span className="sidebar__tag-text">{element.tag}</span>
            </div>
            : false  
            }
          </div>
        )
      })}

    </div>

  )
}

export default NoteList;