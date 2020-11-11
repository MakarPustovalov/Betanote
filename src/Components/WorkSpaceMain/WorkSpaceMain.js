import React from 'react'

function WorkSpaceMain({
    currentNote,
    inputHandler,
    hideTagInput
  }) {

  return (
    <main onClick={hideTagInput} className="mainside__main animate__animated animate__fadeIn">
  
      <textarea
      name="content"
      className="mainside__textarea"
      onChange={inputHandler}
      value={currentNote.content}
      />
  
    </main>
  )
}

export default WorkSpaceMain