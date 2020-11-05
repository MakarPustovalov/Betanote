import React from 'react'
import WorkSpace from '../WorkSpace/WorkSpace'
import logo from '../../assets/img/logo.png'

function MainSide({currentNote,
  descriptionInputHandler,
  contentInputHandler,
  isWorkspaceOn}) {
  return(
    
    <section className="mainside">
      <div className="mainside__wrapper">
        <div className="mainside__container">

          {isWorkspaceOn ? 
            <WorkSpace
            currentNote={currentNote}
            descriptionInputHandler={descriptionInputHandler}
            contentInputHandler={contentInputHandler}
            />
            :
            <div className="mainside__logo-container">
              <img src={logo} alt="Betanote" className="mainside__logo"></img>
            </div>
          }

        </div>
      </div>
    </section>

  )
}

export default MainSide;