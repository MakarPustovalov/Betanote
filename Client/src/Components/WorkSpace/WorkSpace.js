import React from 'react'
import WorkSpaceHeader from '../WorkSpaceHeader/WorkSpaceHeader'
import WorkSpaceMain from '../WorkSpaceMain/WorkSpaceMain'

function WorkSpace({
    currentNote,
    inputHandler,
    saveHandler,
    closeWorkspace,
    deleteNoteHandler,
    resetChanges,
    setTagBtnHandler,
    tagInputHandler,
    hideTagInput
  }){

  return(
    <>
      <WorkSpaceHeader
        currentNote={currentNote}
        inputHandler={inputHandler}
        saveHandler={saveHandler}
        closeWorkspace={closeWorkspace}
        deleteNoteHandler={deleteNoteHandler}
        resetChanges={resetChanges}
        setTagBtnHandler={setTagBtnHandler}
        tagInputHandler={tagInputHandler}
      />

      <WorkSpaceMain 
        currentNote={currentNote}
        inputHandler={inputHandler}
        hideTagInput={hideTagInput}
      />
    </>
  )
}

export default WorkSpace;