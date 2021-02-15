import React from 'react'

function WorkSpaceMain({
    currentNote,
    noteInputHandler,
    hideTagInput
  }) {

  return (
    <main onClick={hideTagInput} className="mainside__main animated fadeIn">
  
      <textarea
        name="content"
        className="mainside__textarea"
        onChange={noteInputHandler}
        value={currentNote.content}
      />
  
    </main>
  )
}

export default WorkSpaceMain