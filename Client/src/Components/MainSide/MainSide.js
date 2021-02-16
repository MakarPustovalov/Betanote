import React from 'react'
import WorkSpace from '../WorkSpace/WorkSpace'
import logo from '../../Assets/img/logo.png'

function MainSide ({
    currentNote,
    saveCurrentNote,
    closeWorkspace,
    deleteNoteHandler,
    isWorkspaceOn,
    updateCurrentNote,
    getNoteById
  }) {
  return(
    <section className="mainside">
      <div className="mainside__wrapper">
        <div className="mainside__container">

          {isWorkspaceOn ? 
            <WorkSpace
              currentNote={currentNote}
              saveCurrentNote={saveCurrentNote}
              closeWorkspace={closeWorkspace}
              deleteNoteHandler={deleteNoteHandler}
              updateCurrentNote={updateCurrentNote}
              getNoteById={getNoteById}
            />
            :
            <div className="mainside__logo-container animated fadeIn">

              <img src={logo} alt="Betanote" className="mainside__logo"></img>

            </div>
          }

        </div>
      </div>
    </section>

  )
}

export default MainSide;