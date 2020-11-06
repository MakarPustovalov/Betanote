import React from 'react'
import logo from '../../Assets/img/logo.png'
import addTag from '../../Assets/img/buttons/addTag.svg'
import cancel from '../../Assets/img/buttons/cancel.svg'
import save from '../../Assets/img/buttons/save.svg'
import close from '../../Assets/img/buttons/close.svg'
import deleteBtn from '../../Assets/img/buttons/delete.svg'

function WorkSpace({
  currentNote,
  inputHandler,
  saveNote,
  closeWorkspace,
  deleteNote,
  resetChanges,
  setTagBtnHandler,
  tagInputHandler,
  hideTagInput
  }){

  return(
    <>
      <header className="mainside__heading animate__animated animate__fadeIn">
        
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

        <input type="text"
        className="mainside__tag-input animate__animated"
        name="tag"
        placeholder="Enter a tag name..."
        maxLength="10"
        onChange={tagInputHandler}
        value={currentNote.tag}
        />
    
        <div className="mainside__controls">
          
          <button title="Delete note" onClick={deleteNote} className="mainside__controls-button">
            <img src={deleteBtn} alt="Delete" />
          </button>
          
          <button title="Add tag" onClick={setTagBtnHandler} className="mainside__controls-button">
            <img src={addTag} alt="Tag" />
          </button>
    
          <button title="Reset unsaved changes" onClick={resetChanges} className="mainside__controls-button">
            <img src={cancel} alt="Cancel" />
          </button>
    
          <button title="Save note" onClick={saveNote} className="mainside__controls-button">
            <img src={save} alt="Save" />
          </button>
    
          <button title="Close" onClick={closeWorkspace} className="mainside__controls-button">
            <img src={close} alt="Close" />
          </button>
    
        </div>
    
      </header>
    
      <main onClick={hideTagInput} className="mainside__main animate__animated animate__fadeIn">
    
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