import React from 'react'

function WorkSpaceMain({
    currentNote,
    noteInputHandler,
    hideTagInput
  }) {

  return (
    <main onClick={hideTagInput} className="mainside__main animate__animated animate__fadeIn">
  
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