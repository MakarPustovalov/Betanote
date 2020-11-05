import React from 'react'
import plus from '../../assets/img/plus.svg'

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
          className="sidebar__note"
          onClick={noteClickHandler}
          >
            <span className="sidebar__note-text">{element.description}</span>
            <div className="sidebar__tag">
              <div className="sidebar__tag-circle"></div>
              <span className="sidebar__tag-text">Tag Name 3</span>
            </div>
          </div>
        )
      })}

    </div>

  )
}

export default NoteList;