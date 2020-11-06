import React from 'react'
import WorkSpace from '../WorkSpace/WorkSpace'
import logo from '../../Assets/img/logo.png'

function MainSide({currentNote,
  inputHandler,
  isWorkspaceOn,
  saveNote,
  closeWorkspace,
  deleteNote,
  resetChanges
}) {
  return(
    
    <section className="mainside">
      <div className="mainside__wrapper">
        <div className="mainside__container">

          {isWorkspaceOn ? 
            <WorkSpace
            currentNote={currentNote}
            inputHandler={inputHandler}
            saveNote={saveNote}
            closeWorkspace={closeWorkspace}
            deleteNote={deleteNote}
            resetChanges={resetChanges}
            />
            :
            <div className="mainside__logo-container animate__animated animate__fadeIn">
              <img src={logo} alt="Betanote" className="mainside__logo"></img>
            </div>
          }

        </div>
      </div>
    </section>

  )
}

export default MainSide;