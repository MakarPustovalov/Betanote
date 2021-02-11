import React from 'react'
import WorkSpaceHeader from '../WorkSpaceHeader/WorkSpaceHeader'
import WorkSpaceMain from '../WorkSpaceMain/WorkSpaceMain'

function WorkSpace({
    currentNote,
    noteInputHandler,
    saveHandler,
    closeWorkspace,
    deleteNoteHandler,
    resetChanges,
    setTagBtnHandler,
    hideTagInput
  }){

  return(
    <>
      <WorkSpaceHeader
        currentNote={currentNote}
        noteInputHandler={noteInputHandler}
        saveHandler={saveHandler}
        closeWorkspace={closeWorkspace}
        deleteNoteHandler={deleteNoteHandler}
        resetChanges={resetChanges}
        setTagBtnHandler={setTagBtnHandler}
      />

      <WorkSpaceMain 
        currentNote={currentNote}
        noteInputHandler={noteInputHandler}
        hideTagInput={hideTagInput}
      />
    </>
  )
}

export default WorkSpace;