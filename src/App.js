import React from 'react'
import MainSide from './Components/MainSide/MainSide';
import Sidebar from './Components/Sidebar/Sidebar';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: JSON.parse(localStorage.getItem('notesData')),
      currentNote: {},
      isWorkspaceOn: false,
    }
    this.inputHandler = this.inputHandler.bind(this)
    this.noteClickHandler = this.noteClickHandler.bind(this)
    this.saveNote = this.saveNote.bind(this)
    this.createNewNote =this.createNewNote.bind(this)
    this.closeWorkspace = this.closeWorkspace.bind(this)
  }

  setLocalStorage() {
    const notesData = JSON.stringify(this.state.notes)
    localStorage.setItem('notesData', notesData)
  }

  inputHandler(event) {
    this.setState(state => {
      return {currentNote: 
        {...state.currentNote, [event.target.name]: event.target.value}
      }
    })
  }

  getNoteById(id) {
    const note = this.state.notes.filter(element => {
      return element.id === id
    })
    if (note.length > 0) return note[0]
    return false
  }

  noteClickHandler(event) {
    const id = event.target.id
    const note = this.getNoteById(id)
    this.setState({currentNote: note, isWorkspaceOn: true})
  }

  closeWorkspace() {
    this.setState({isWorkspaceOn: false})
  }

  saveNote() {
    const activeNote = this.getNoteById(this.state.currentNote.id)

    if (activeNote) {
      const newNotes = this.state.notes.map(element => {
        if (element === activeNote) return this.state.currentNote
        return element
      })

      this.setState(state => {
        return {
          ...state,
          notes: newNotes
        }
      }, this.setLocalStorage)
    } else if (!activeNote) {
      const newNotes = this.state.notes
      newNotes.unshift(this.state.currentNote)

      this.setState(state => {
        return {
          ...state,
          notes: newNotes
        }
      }, this.setLocalStorage)
    }
  }

  createNewNote() {
    this.setState({currentNote: {
      id: `id-3-${(+new Date).toString()}`,
      description: '',
      content: "",
    }, isWorkspaceOn: true})
  }

  render() {
    console.log(this.state)

    return (
      <div className="page">

        <Sidebar
        notes={this.state.notes}
        noteClickHandler={this.noteClickHandler}
        createNewNote={this.createNewNote}
        />

        <MainSide
        currentNote={this.state.currentNote}
        inputHandler={this.inputHandler}
        isWorkspaceOn={this.state.isWorkspaceOn}
        saveNote={this.saveNote}
        closeWorkspace={this.closeWorkspace}
        />
    
      </div>
    );
  }
}

export default App;
