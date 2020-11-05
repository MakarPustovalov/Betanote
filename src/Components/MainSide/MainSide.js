import React from 'react'
import WorkSpace from '../WorkSpace/WorkSpace'

function MainSide(props) {
  return(
    
    <section className="mainside">
      <div className="mainside__wrapper">
        <div className="mainside__container">
  
          {/* <img src="img/logo.png" alt="Betanote" className="mainside__logo"> */}

          <WorkSpace
          currentNote={props.currentNote}
          descriptionInputHandler={props.descriptionInputHandler}
          contentInputHandler={props.contentInputHandler}
          />
  
        </div>
      </div>
    </section>

  )
}

export default MainSide;