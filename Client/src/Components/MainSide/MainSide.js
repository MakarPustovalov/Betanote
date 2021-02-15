import React from 'react'
import WorkSpace from '../WorkSpace/WorkSpace'
import logo from '../../Assets/img/logo.png'

function MainSide ({
    currentNote,
    noteInputHandler,
    saveCurrentNote,
    closeWorkspace,
    deleteNoteHandler,
    resetChanges,
    isWorkspaceOn
  }) {
  return(
    <section className="mainside">
      <div className="mainside__wrapper">
        <div className="mainside__container">

          {isWorkspaceOn ? 
            <WorkSpace
              currentNote={currentNote}
              noteInputHandler={noteInputHandler}
              saveCurrentNote={saveCurrentNote}
              closeWorkspace={closeWorkspace}
              deleteNoteHandler={deleteNoteHandler}
              resetChanges={resetChanges}
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