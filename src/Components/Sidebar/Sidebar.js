import React from 'react'
import NoteList from '../NoteList/NoteList'

function Sidebar({notes, noteClickHandler, createNewNote, lastTags}) {
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

              {lastTags.length > 0 ?
                lastTags.map(tag => {
                  return(
                    <div key={Math.floor(Math.random() * 1000)} className="sidebar__tag">
                      <div className="sidebar__tag-circle"></div>
                      <span className="sidebar__tag-text">{tag}</span>
                    </div>
                  )
                }) : false
              }
    
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