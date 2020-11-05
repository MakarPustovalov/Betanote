import React from 'react'
import MainSide from './Components/MainSide/MainSide';
import Sidebar from './Components/Sidebar/Sidebar';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: [
        {
          id: `id-1-${(+new Date).toString()}`,
          description: 'My note 1',
          content: "Hello world! I'm a note!",
        },
        {
          id: `id-2-${(+new Date).toString()}`,
          description: 'My note 2',
          content: "Hello world! I'm a second note!",
        },
        {
          id: `id-3-${(+new Date).toString()}`,
          description: 'My note 3',
          content: "Hello world! I'm a third note!",
        },
      ],
      currentNote: {},
      isWorkspaceOn: false,
    }
    this.inputHandler = this.inputHandler.bind(this)
    this.noteClickHandler = this.noteClickHandler.bind(this)
    this.saveNote = this.saveNote.bind(this)
  }

  inputHandler(event) {
    this.setState(state => {
      return {currentNote: 
        {...state.currentNote, [event.target.name]: event.target.value}
      }
    })
  }

  getNoteById(id) {
    let note = this.state.notes.filter(element => {
      return element.id === id
    })
    return note[0]
  }

  noteClickHandler(event) {
    let id = event.target.id
    let note = this.getNoteById(id)
    this.setState({currentNote: note, isWorkspaceOn: true})
  }

  saveNote() {
    let activeNote = this.getNoteById(this.state.currentNote.id)
    let newNotes = this.state.notes.map(element => {
      if (element === activeNote) return this.state.currentNote
      return element
    })
    this.setState(state => {
      return {
        ...state,
        notes: newNotes
      }
    })
  }

  render() {
    console.log(this.state)

    return (
      <div className="page">

        <Sidebar
        notes={this.state.notes}
        noteClickHandler={this.noteClickHandler}
        />

        <MainSide
        currentNote={this.state.currentNote}
        inputHandler={this.inputHandler}
        isWorkspaceOn={this.state.isWorkspaceOn}
        saveNote={this.saveNote}
        />
    
      </div>
    );
  }
}

export default App;
