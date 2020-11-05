import React from 'react'
import logo from '../../assets/img/logo.png'
import addTag from '../../assets/img/buttons/addTag.svg'
import cancel from '../../assets/img/buttons/cancel.svg'
import save from '../../assets/img/buttons/save.svg'
import close from '../../assets/img/buttons/close.svg'

function WorkSpace() {
  return(
    <>
      <header className="mainside__heading">
        
        <img src={logo}
        alt="Betanote"
        className="mainside__heading-logo" />
    
        <input
        className="mainside__description"
        placeholder="Task description" />
    
        <div className="mainside__controls">
          
          <button className="mainside__controls-button">
            <img src={addTag} alt="" />
          </button>
    
          <button className="mainside__controls-button">
            <img src={cancel} alt="" />
          </button>
    
          <button className="mainside__controls-button">
            <img src={save} alt="" />
          </button>
    
          <button className="mainside__controls-button">
            <img src={close} alt="" />
          </button>
    
        </div>
    
      </header>
    
      <main className="mainside__main">
    
        <textarea
        name="taskContent"
        className="mainside__textarea" />
    
      </main>
    </>
  )
}

export default WorkSpace;