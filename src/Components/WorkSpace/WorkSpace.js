import React from 'react'
import logo from '../../assets/img/logo.png'
import addTag from '../../assets/img/buttons/addTag.svg'
import cancel from '../../assets/img/buttons/cancel.svg'
import save from '../../assets/img/buttons/save.svg'
import close from '../../assets/img/buttons/close.svg'
import deleteBtn from '../../assets/img/buttons/delete.svg'

function WorkSpace({currentNote, inputHandler, saveNote, closeWorkspace, deleteNote}) {
  return(
    <>
      <header className="mainside__heading">
        
        <img src={logo}
        alt="Betanote"
        className="mainside__heading-logo" />
    
        <input
        className="mainside__description"
        placeholder="Note description"
        name="description"
        onChange={inputHandler}
        value={currentNote.description}
        />
    
        <div className="mainside__controls">
          
          <button onClick={deleteNote} className="mainside__controls-button">
            <img src={deleteBtn} alt="Delete" />
          </button>
          
          <button className="mainside__controls-button">
            <img src={addTag} alt="Tag" />
          </button>
    
          <button className="mainside__controls-button">
            <img src={cancel} alt="Cancel" />
          </button>
    
          <button onClick={saveNote} className="mainside__controls-button">
            <img src={save} alt="Save" />
          </button>
    
          <button onClick={closeWorkspace} className="mainside__controls-button">
            <img src={close} alt="Close" />
          </button>
    
        </div>
    
      </header>
    
      <main className="mainside__main">
    
        <textarea
        name="content"
        className="mainside__textarea"
        onChange={inputHandler}
        value={currentNote.content}
        />
    
      </main>
    </>
  )
}

export default WorkSpace;