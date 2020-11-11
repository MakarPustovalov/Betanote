import React from 'react'
import WorkSpaceGuide from '../WorkSpaceGuide/WorkSpaceGuide';
import WorkSpaceHeader from '../WorkSpaceHeader/WorkSpaceHeader'
import WorkSpaceMain from '../WorkSpaceMain/WorkSpaceMain'

function WorkSpace({
    currentNote,
    inputHandler,
    saveHandler,
    closeWorkspace,
    deleteNote,
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
        deleteNote={deleteNote}
        resetChanges={resetChanges}
        setTagBtnHandler={setTagBtnHandler}
        tagInputHandler={tagInputHandler}
      />

      <WorkSpaceMain 
        currentNote={currentNote}
        inputHandler={inputHandler}
        hideTagInput={hideTagInput}
      />

      {document.cookie === '' ? 
        <WorkSpaceGuide />
      : false}
    </>
  )
}

export default WorkSpace;