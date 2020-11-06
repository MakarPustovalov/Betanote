import React from 'react'
import NoteList from '../NoteList/NoteList'

function Sidebar({notes, noteClickHandler, createNewNote}) {
  return(

    <section className="sidebar">
      <div className="sidebar__wrapper">
        <div className="sidebar__container animate__animated animate__fadeIn">
  
          <div className="sidebar__header">
  
            <input
            type="text"
            className="sidebar__input"
            placeholder="Search note by tag..." />
    
            <div className="sidebar__tag-line">
    
              <div className="sidebar__tag">
                <div className="sidebar__tag-circle"></div>
                <span className="sidebar__tag-text">Tag Name 1</span>
              </div>
    
              <div className="sidebar__tag">
                <div className="sidebar__tag-circle"></div>
                <span className="sidebar__tag-text">Tag Name 2</span>
              </div>
    
              <div className="sidebar__tag">
                <div className="sidebar__tag-circle"></div>
                <span className="sidebar__tag-text">Tag Name 3</span>
              </div>
    
            </div>
  
          </div>

          <NoteList
          notes={notes}
          noteClickHandler={noteClickHandler}
          createNewNote={createNewNote}
          />
  
        </div>
      </div>
    </section>

  );
}

export default Sidebar;