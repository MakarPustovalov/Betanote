import React from 'react'
import WorkSpace from '../WorkSpace/WorkSpace'

function MainSide() {
  return(
    
    <section className="mainside">
      <div className="mainside__wrapper">
        <div className="mainside__container">
  
          {/* <img src="img/logo.png" alt="Betanote" className="mainside__logo"> */}

          <WorkSpace />
  
        </div>
      </div>
    </section>

  )
}

export default MainSide;